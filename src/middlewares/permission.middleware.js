const { isAuthenticated } = require("../utils/auth");
const { PermissionError } = require("../utils/error");
const { checkByConnectId, isAdmin } = require("../utils/permission");

/**
 * @param resolve
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|PermissionError>}
 */
const checkByConnectIdMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    return checkByConnectId(ctx.user, args)
        ? await resolve(parent, args, ctx, info)
        : new PermissionError();
};

/**
 * @param resolve
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|PermissionError>}
 */
const checkIsAdminMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    return isAdmin(ctx.user.roles)
        ? await resolve(parent, args, ctx, info)
        : new PermissionError();
};

/**
 * @param resolve
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|PermissionError|*>}
 */
const accountMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    const { id: userId, roles } = ctx.user;

    if (!isAdmin(roles)) {
        return userId === args.where.id
            ? await resolve(parent, args, ctx, info)
            : new PermissionError();
    }

    return await resolve(parent, args, ctx, info);
};

/**
 * @param resolve
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|*|PermissionError>}
 */
const eventMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    const { id: userId, roles } = ctx.user;

    if (isAdmin(roles)) {
        return await resolve(parent, args, ctx, info);
    }

    const hasPermission = await ctx.prisma.exists.Event({
        id: args.where.id,
        owener: { id: userId },
    });

    return hasPermission
        ? await resolve(parent, args, ctx, info)
        : new PermissionError();
};

/**
 * @param resolve
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|*|PermissionError>}
 */
const applicationMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    const { id: userId, roles } = ctx.user;

    if (isAdmin(roles)) {
        return await resolve(parent, args, ctx, info);
    }

    const hasPermission = await ctx.prisma.exists.Application({
        id: args.where.id,
        buyer: { id: userId },
    });

    return hasPermission
        ? await resolve(parent, args, ctx, info)
        : new PermissionError();
};

/**
 * @param resolve
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|*|PermissionError>}
 */
const contractMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    const { roles } = ctx.user;

    if (isAdmin(roles)) {
        return await resolve(parent, args, ctx, info);
    }

    const hasPermission = await ctx.prisma.exists.Contract({
        id: args.where.id,
    });

    return hasPermission
        ? await resolve(parent, args, ctx, info)
        : new PermissionError();
};

/**
 * @type {{checkIsAdminMiddleware: (function(*, *=, *=, *=, *=): *|PermissionError), contractMiddleware: (function(*, *=, *=, *=, *=): Promise<*|PermissionError>), checkByConnectIdMiddleware: (function(*, *=, *=, *=, *=): *|PermissionError), applicationMiddleware: (function(*, *=, *=, *=, *=): Promise<*|PermissionError>), eventMiddleware: (function(*, *=, *=, *=, *=): Promise<*|PermissionError>), accountMiddleware: (function(*, *=, *=, *=, *=): Promise<*|PermissionError>)}}
 */
module.exports = {
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
    eventMiddleware,
    accountMiddleware,
    applicationMiddleware,
    contractMiddleware,
};
