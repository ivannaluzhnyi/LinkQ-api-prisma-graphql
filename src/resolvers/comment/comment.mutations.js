const { publishCommentByType } = require("./comment.subscription");
const { SubscriptionActionTypes } = require("../../constants/enums");

async function createComment(parent, args, ctx, info) {

    const createdApp = await ctx.prisma.mutation.createComment(args);

    console.log("createdApp => ", createdApp);
    await publishCommentByType(
        ctx,
        createdApp,
        SubscriptionActionTypes.CREATE
    );
    return createdApp;
}

async function updateComment(parent, args, ctx, info) {
    const updatedApp = await ctx.prisma.mutation.updateComment(args);
    await publishCommentByType(
        ctx,
        updatedApp,
        SubscriptionActionTypes.UPDATE
    );

    return updatedApp;
}

async function deleteComment(parent, args, ctx, info) {
    const deletedApp = await ctx.prisma.mutation.deleteComment(args);
    await publishCommentaireByType(
        ctx,
        deletedApp,
        SubscriptionActionTypes.DELETE
    );

    return deletedApp;
}

module.exports = {
    updateComment,
    deleteComment,
    createComment,
};