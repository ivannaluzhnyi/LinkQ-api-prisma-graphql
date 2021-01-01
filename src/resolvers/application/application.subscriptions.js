const { PUPSUB_APPLICATION } = require("../../constants/subscriptions.types");
const { SubscriptionActionTypes } = require("../../constants/enums");

/**
 *
 * @param {*} ctx
 * @param {*} application
 * @param {SubscriptionActionTypes} actionType
 */
const publishApplicationByType = async (ctx, application, actionType) => {
    const { pubsub } = ctx;
    pubsub.publish(PUPSUB_APPLICATION, {
        application: {
            actionType,
            application,
        },
    });
};

module.exports = {
    publishApplicationByType,
};