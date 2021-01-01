const { publishApplicationByType } = require("./application.subscriptions");
const { SubscriptionActionTypes } = require("../../constants/enums");

const { isAdmin } = require("../../utils/permission");

async function createApplication(parent, args, ctx, info) {
    const nextArgs = { ...args };

    const { roles, id: userId } = ctx.user;

    if (!isAdmin(roles)) {
        nextArgs.data.buyer.connect.id = userId;
    }

    const createdApp = await ctx.prisma.mutation.createApplication(args);

    console.log("createdApp => ", createdApp);
    await publishApplicationByType(
        ctx,
        createdApp,
        SubscriptionActionTypes.CREATE
    );
    return createdApp;
}

async function updateApplication(parent, args, ctx, info) {
    const updatedApp = await ctx.prisma.mutation.updateApplication(args);
    await publishApplicationByType(
        ctx,
        updatedApp,
        SubscriptionActionTypes.UPDATE
    );

    return updatedApp;
}

async function deleteApplication(parent, args, ctx, info) {
    const deletedApp = await ctx.prisma.mutation.deleteApplication(args);
    await publishApplicationByType(
        ctx,
        deletedApp,
        SubscriptionActionTypes.DELETE
    );

    return deletedApp;
}

module.exports = {
    updateApplication,
    deleteApplication,
    createApplication,
};