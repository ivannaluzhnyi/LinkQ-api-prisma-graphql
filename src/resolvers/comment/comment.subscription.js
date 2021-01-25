const { PUPSUB_COMMENT } = require("../../constants/subscriptions.types");
const { SubscriptionActionTypes } = require("../../constants/enums");

/**
 *
 * @param {*} ctx
 * @param {*} comment
 * @param {SubscriptionActionTypes} actionType
 */
const publishCommentByType = async (ctx, comment, actionType) => {
    const { pubsub } = ctx;
    pubsub.publish(PUPSUB_COMMENT, {
        comment: {
            actionType,
            comment,
        },
    });
};

module.exports = {
    publishCommentByType,
};