const {
    PUPSUB_ACCOUNT,
    PUPSUB_EVENT,
} = require("../constants/subscriptions.types");
module.exports = {
    account: {
        subscribe: (_, __, { pubsub }) => {
            return pubsub.asyncIterator(PUPSUB_ACCOUNT);
        },
    },
    event: {
        subscribe: (_, __, { pubsub }) => {
            return pubsub.asyncIterator(PUPSUB_EVENT);
        },
    },
};
