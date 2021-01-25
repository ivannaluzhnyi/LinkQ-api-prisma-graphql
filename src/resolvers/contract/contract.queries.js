const { forwardTo } = require("prisma-binding");
const { isAdmin } = require("../../utils/permission");

async function contract(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function contracts(parent, args, ctx, info) {
    const { roles, id: userId } = ctx.user;

    if (isAdmin(roles)) {
        return forwardTo("prisma")(parent, args, ctx, info);
    }
    return await ctx.prisma.query.contracts({
        ...args,
        where: {
            ...args.where,
            application: {
                buyer: {
                    id: userId,
                },
            },
        },
    });
}
module.exports = { contract, contracts };
