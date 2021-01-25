const { publishApplicationByType } = require("./application.subscriptions");
const { SubscriptionActionTypes } = require("../../constants/enums");

const { forwardTo } = require("prisma-binding");

const { isAdmin } = require("../../utils/permission");

const returnType = `{ 
    id 
    status 
    updated 
    property_id 
    offer 
    created 
    buyer { 
        id
        email 
        firstname
        lastname
        roles
    } 
}`;

async function createApplication(parent, args, ctx, info) {
    const nextArgs = { ...args };

    const { roles, id: userId } = ctx.user;

    if (!isAdmin(roles)) {
        nextArgs.data.buyer.connect.id = userId;
    }

    const createdApp = await ctx.prisma.mutation.createApplication(
        args,
        returnType
    );

    await publishApplicationByType(
        ctx,
        createdApp,
        SubscriptionActionTypes.CREATE
    );
    return createdApp;
}

async function updateApplication(parent, args, ctx, info) {
    const updatedApp = await ctx.prisma.mutation.updateApplication(
        args,
        returnType
    );
    await publishApplicationByType(
        ctx,
        updatedApp,
        SubscriptionActionTypes.UPDATE
    );

    return updatedApp;
}

async function deleteApplication(parent, args, ctx, info) {
    const deletedApp = await ctx.prisma.mutation.deleteApplication(
        args,
        returnType
    );
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
