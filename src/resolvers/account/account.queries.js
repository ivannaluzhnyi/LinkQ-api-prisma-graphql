const { forwardTo } = require("prisma-binding");

async function account(parent, args, ctx, info) {
    return await ctx.prisma.query.account({ where: { id: user.id } });
}

async function accounts(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = { account, accounts };
