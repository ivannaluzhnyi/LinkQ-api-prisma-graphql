const { PUPSUB_ACCOUNT } = require("../../constants/subscriptions.types");
const { SubscriptionActionTypes } = require("../../constants/enums");

const publishUpdate = async (ctx, args) => {
    const { prisma, pubsub } = ctx;
    const updatedAccount = await prisma.query.account({
        where: { id: args.where.id },
    });

    pubsub.publish(PUPSUB_ACCOUNT, {
        account: {
            actionType: SubscriptionActionTypes.UPDATE,
            account: updatedAccount,
        },
    });
};

const publishDelete = async (ctx, args) => {
    const { prisma, pubsub } = ctx;
    const deletedAccount = await prisma.query.account({
        where: { id: args.where.id },
    });

    pubsub.publish(PUPSUB_ACCOUNT, {
        account: {
            actionType: SubscriptionActionTypes.DELETE,
            account: deletedAccount,
        },
    });
};

module.exports = {
    publishUpdate,
    publishDelete,
};
