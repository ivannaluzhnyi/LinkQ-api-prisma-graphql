const { forwardTo } = require("prisma-binding");
const { isAdmin } = require("../../utils/permission");

async function application(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function applications(parent, args, ctx, info) {
    if (isAdmin(ctx.user.roles)) {
        return forwardTo("prisma")(parent, args, ctx, info);
    }
    return await ctx.prisma.query.applications({
        ...args,
        where: {
            ...args.where,
            buyer: { id: ctx.user.id },
        },
    });
}
module.exports = { application, applications };