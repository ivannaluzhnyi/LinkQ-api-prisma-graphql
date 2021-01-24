const { forwardTo } = require("prisma-binding");

async function Commentaire(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function Commentaires(parent, args, ctx, info) {
    return await ctx.prisma.query.Commentaires({
        ...args,
        where: {
            ...args.where,
            buyer: { id: ctx.user.id },
        },
    });
}
module.exports = { Commentaire, Commentaires };