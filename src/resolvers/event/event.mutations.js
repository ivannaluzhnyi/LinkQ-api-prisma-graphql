const { publishEventByType } = require("./event.subscription");
const { SubscriptionActionTypes } = require("../../constants/enums");

/**
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*>}
 */
async function createEvent(parent, args, ctx, info) {
    const createdEvent = await ctx.prisma.mutation.createEvent(args);
    await publishEventByType(ctx, createdEvent, SubscriptionActionTypes.CREATE);
    return createdEvent;
}

/**
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*>}
 */
async function updateEvent(parent, args, ctx, info) {
    const updatedEvent = await ctx.prisma.mutation.updateEvent(args);
    await publishEventByType(ctx, updatedEvent, SubscriptionActionTypes.UPDATE);

    return updatedEvent;
}

/**
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*>}
 */
async function deleteEvent(parent, args, ctx, info) {
    const deletedEvent = await ctx.prisma.mutation.deleteEvent(args);
    await publishEventByType(ctx, deletedEvent, SubscriptionActionTypes.DELETE);

    return deletedEvent;
}

/**
 * @type {{updateEvent: (function(*, *=, *=, *): *), createEvent: (function(*, *=, *=, *): *), deleteEvent: (function(*, *=, *=, *): *)}}
 */
module.exports = {
    updateEvent,
    deleteEvent,
    createEvent,
};
