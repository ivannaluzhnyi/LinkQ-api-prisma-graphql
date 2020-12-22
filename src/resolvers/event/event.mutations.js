const { forwardTo } = require("prisma-binding");
const { getUser } = require("../../utils/helpers.resolvers");
const {
    permissionMiddleware,
    checkByConnectId,
} = require("../../utils/permission");

async function createEvent(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canCreate = checkByConnectId(user, args);
    permissionMiddleware(canCreate);

    return forwardTo("prisma")(parent, args, ctx, info);
}

async function updateEvent(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canUpdate = checkByWhere(user, args);

    permissionMiddleware(canUpdate);
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function deleteEvent(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canDelete = checkByWhere(user, args);

    permissionMiddleware(canDelete);

    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = {
    updateEvent,
    deleteEvent,
    createEvent,
};
