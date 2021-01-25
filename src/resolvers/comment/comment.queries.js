const { forwardTo } = require("prisma-binding");
const { isAdmin } = require("../../utils/permission");

async function Comment(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function Comments(parent, args, ctx, info) {
    if (isAdmin(ctx.user.roles)) {
        return forwardTo("prisma")(parent, args, ctx, info);
    }
    return await ctx.prisma.query.Comments({
        ...args,
        where: {
            ...args.where,
            email: { id: ctx.user.email },
        },
    });
}
module.exports = { Comment, Comments };