const { forwardTo } = require("prisma-binding");

const { isAdmin } = require("../../utils/permission");

async function event(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

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

module.exports = { event, events };
