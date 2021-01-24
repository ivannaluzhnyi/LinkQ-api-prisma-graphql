async function createCommentaire(parent, args, ctx, info) {

    const createdApp = await ctx.prisma.mutation.createCommentaire(args);

    console.log("createdApp => ", createdApp);
    return createdApp;
}

async function deleteCommentaire(parent, args, ctx, info) {
    const deletedApp = await ctx.prisma.mutation.deleteCommentaire(args);

    return deletedApp;
}

module.exports = {
    deleteCommentaire,
    createCommentaire,
};