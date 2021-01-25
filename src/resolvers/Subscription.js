const {
    PUPSUB_ACCOUNT,
    PUPSUB_EVENT,
    PUPSUB_LOGIN,
    PUPSUB_APPLICATION,
    PUPSUB_COMMENT
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
    login: {
        subscribe: (_, __, { pubsub }) => {
            return pubsub.asyncIterator(PUPSUB_LOGIN);
        },
    },
    application: { 
        subscribe: (_, __, { pubsub }) => {
            return pubsub.asyncIterator(PUPSUB_APPLICATION);
        },
    },
    comment: {
        subscribe: (_, __, { pubsub }) => {
            return pubsub.asyncIterator(PUPSUB_COMMENT);
        },
    },
};
