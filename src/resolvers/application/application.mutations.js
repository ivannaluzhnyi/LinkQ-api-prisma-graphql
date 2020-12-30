const { forwardTo } = require("prisma-binding");
const { getUser } = require("../../utils/helpers.resolvers");
const {
    permissionMiddleware,
    checkByConnectId,
} = require("../../utils/permission");

async function createApplication(parent, args, ctx, info) {
    const user = await getUser(ctx);
    console.log('user :>> ', user);
    const canCreate = checkByConnectId(user, args);
    console.log('canCreate :>> ', canCreate);
    permissionMiddleware(canCreate);

    return forwardTo("prisma")(parent, args, ctx, info);
}

async function updateApplication(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canUpdate = checkByWhere(user, args);

    permissionMiddleware(canUpdate);
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function deleteApplication(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canDelete = checkByWhere(user, args);

    permissionMiddleware(canDelete);

    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = {
    updateApplication,
    deleteApplication,
    createApplication,
};
