const { PUPSUB_EVENT } = require("../../constants/subscriptions.types");
const { SubscriptionActionTypes } = require("../../constants/enums");

/**
 *
 * @param {*} ctx
 * @param {*} event
 * @param {SubscriptionActionTypes} actionType
 */
const publishEventByType = async (ctx, event, actionType) => {
    const { pubsub } = ctx;

    pubsub.publish(PUPSUB_EVENT, {
        event: {
            actionType,
            event,
        },
    });
};

/**
 * @type {{publishEventByType: (function(*, *, SubscriptionActionTypes): Promise<void>)}}
 */
module.exports = {
    publishEventByType,
};
