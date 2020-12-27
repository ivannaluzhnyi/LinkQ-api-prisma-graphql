const { forwardTo } = require("prisma-binding");

const { publishUpdate, publishDelete } = require("./event.subscription");

async function createEvent(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

async function updateEvent(parent, args, ctx, info) {
    const response = await forwardTo("prisma")(parent, args, ctx, info);
    await publishUpdate(ctx, args);
    return response;
}

async function deleteEvent(parent, args, ctx, info) {
    await publishDelete(ctx, args);

    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = {
    updateEvent,
    deleteEvent,
    createEvent,
};
