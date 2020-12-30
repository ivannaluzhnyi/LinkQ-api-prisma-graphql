const { forwardTo } = require("prisma-binding");

const {
    publishUpdate,
    publishDelete,
    publishCreate,
} = require("./event.subscription");

async function createEvent(parent, args, ctx, info) {
    const createdEvent = await ctx.prisma.mutation.createEvent(args);
    await publishCreate(ctx, createdEvent);
    return createdEvent;
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
