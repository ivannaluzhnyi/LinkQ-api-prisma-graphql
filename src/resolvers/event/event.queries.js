const { forwardTo } = require("prisma-binding");

const { isAdmin } = require("../../utils/permission");

/**
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*>}
 */
async function event(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

/**
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|*>}
 */
async function events(parent, args, ctx, info) {
    if (isAdmin(ctx.user.roles)) {
        return forwardTo("prisma")(parent, args, ctx, info);
    }
    return await ctx.prisma.query.events({
        ...args,
        where: {
            ...args.where,
            owener: { id: ctx.user.id },
        },
    });
}

/**
 * @type {{event: (function(*=, *=, *=, *=): *), events: (function(*=, *=, *=, *=): Promise<*>)}}
 */
module.exports = { event, events };
