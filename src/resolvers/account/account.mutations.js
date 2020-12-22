const { forwardTo } = require("prisma-binding");
const { getUser } = require("../../utils/helpers.resolvers");

const {
    permissionMiddleware,
    checkByWhere,
} = require("../../utils/permission");

const { publishUpdate, publishDelete } = require("./account.subscriptions");

async function updateAccount(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canUpdate = checkByWhere(user, args);

    permissionMiddleware(canUpdate);

    const response = await forwardTo("prisma")(parent, args, ctx, info);
    await publishUpdate(ctx, args);

    return response;
}

async function deleteAccount(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canDelete = checkByWhere(user, args);

    permissionMiddleware(canDelete);
    await publishDelete(ctx, args);

    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = {
    updateAccount,
    deleteAccount,
};
