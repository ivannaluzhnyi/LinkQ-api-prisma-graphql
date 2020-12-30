const { PUPSUB_EVENT } = require("../../constants/subscriptions.types");
const { SubscriptionActionTypes } = require("../../constants/enums");

const publishCreate = async (ctx, createdEvent) => {
    const { pubsub } = ctx;

    pubsub.publish(PUPSUB_EVENT, {
        event: {
            actionType: SubscriptionActionTypes.CREATE,
            event: createdEvent,
        },
    });
};

const publishUpdate = async (ctx, args) => {
    const { prisma, pubsub } = ctx;
    const updatedEvent = await prisma.query.event({
        where: { id: args.where.id },
    });

    pubsub.publish(PUPSUB_EVENT, {
        event: {
            actionType: SubscriptionActionTypes.UPDATE,
            event: updatedEvent,
        },
    });
};

const publishDelete = async (ctx, args) => {
    const { prisma, pubsub } = ctx;
    const deletedEvent = await prisma.query.event({
        where: { id: args.where.id },
    });

    pubsub.publish(PUPSUB_EVENT, {
        event: {
            actionType: SubscriptionActionTypes.DELETE,
            event: deletedEvent,
        },
    });
};

module.exports = {
    publishUpdate,
    publishDelete,
    publishCreate,
};
