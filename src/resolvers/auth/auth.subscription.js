const { PUPSUB_LOGIN } = require("../../constants/subscriptions.types");

const publishLogin = async (ctx, account) => {
    const { pubsub } = ctx;

    pubsub.publish(PUPSUB_LOGIN, {
        login: {
            account: account,
            time_connexion: Date.now(),
        },
    });
};

module.exports = { publishLogin };
