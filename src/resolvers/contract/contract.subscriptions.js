const { PUPSUB_contract } = require("../../constants/subscriptions.types");
const { SubscriptionActionTypes } = require("../../constants/enums");

/**
 *
 * @param {*} ctx
 * @param {*} contract
 * @param {SubscriptionActionTypes} actionType
 */
const publishContractByType = async (ctx, contract, actionType) => {
    const { pubsub } = ctx;
    pubsub.publish(PUPSUB_contract, {
        contract: {
            actionType,
            contract,
        },
    });
};

module.exports = {
    publishContractByType,
};
