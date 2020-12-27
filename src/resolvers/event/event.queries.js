const { forwardTo } = require("prisma-binding");

async function event(parent, args, ctx, info) {
    return await ctx.prisma.query.account({ where: { id: user.id } });
}

async function events(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = { event, events };
