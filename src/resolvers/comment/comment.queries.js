const { forwardTo } = require("prisma-binding");
const { isAdmin } = require("../../utils/permission");

async function comment(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function comments(parent, args, ctx, info) {
    if (ctx.user && isAdmin(ctx.user.roles)) {
        return forwardTo("prisma")(parent, args, ctx, info);
    }

    if(args.where.idProperty){
        return forwardTo("prisma")(parent, args, ctx, info);
    }

    throw new Error('missing: idProperty')
   
}
module.exports = { comment, comments };