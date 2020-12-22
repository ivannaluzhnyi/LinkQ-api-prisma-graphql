const { forwardTo } = require("prisma-binding");
const { getUser } = require("../../utils/helpers.resolvers");
const {
    permissionMiddleware,
    checkByWhere,
} = require("../../utils/permission");

async function updateAccount(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canUpdate = checkByWhere(user, args);

    permissionMiddleware(canUpdate);

    return forwardTo("prisma")(parent, args, ctx, info);
}

async function deleteAccount(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canDelete = checkByWhere(user, args);

    permissionMiddleware(canDelete);

    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = {
    updateAccount,
    deleteAccount,
};
