const { forwardTo } = require("prisma-binding");
const { getUser } = require("../../utils/helpers.resolvers");
const {
    permissionMiddleware,
    checkByConnectId,
} = require("../../utils/permission");

const { publishUpdate, publishDelete } = require("./event.subscription");

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

    const response = await forwardTo("prisma")(parent, args, ctx, info);
    await publishUpdate(ctx, args);
    return response;
}

async function deleteEvent(parent, args, ctx, info) {
    const user = await getUser(ctx);
    const canDelete = checkByWhere(user, args);

    permissionMiddleware(canDelete);
    await publishDelete(ctx, args);

    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = {
    updateEvent,
    deleteEvent,
    createEvent,
};
