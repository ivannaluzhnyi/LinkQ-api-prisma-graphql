const { isAuthenticated } = require("../utils/auth");
const { PermissionError } = require("../utils/error");
const { checkByConnectId, isAdmin } = require("../utils/permission");

const checkByConnectIdMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    return checkByConnectId(ctx.user, args)
        ? await resolve(parent, args, ctx, info)
        : new PermissionError();
};

const checkIsAdminMiddleware = async (resolve, parent, args, ctx, info) => {
    await isAuthenticated(ctx);

    return isAdmin(ctx.user.roles)
        ? await resolve(parent, args, ctx, info)
        : new PermissionError();
};

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

module.exports = {
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
    eventMiddleware,
    accountMiddleware,
    applicationMiddleware,
    contractMiddleware,
};
