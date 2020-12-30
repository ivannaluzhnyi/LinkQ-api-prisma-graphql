const {
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
    eventMiddleware,
    accountMiddleware,
} = require("./permission.middleware");

const { isAuthenticatedMiddleware } = require("./auth.middleware");

const endpointsMiddleware = {
    Mutation: {
        updateAccount: accountMiddleware,
        deleteAccount: accountMiddleware,

        createEvent: checkByConnectIdMiddleware,
        updateEvent: eventMiddleware,
        deleteEvent: eventMiddleware,
    },
    Query: {
        accounts: checkIsAdminMiddleware,
        account: accountMiddleware,

        event: eventMiddleware,
        events: isAuthenticatedMiddleware,
    },
    Subscription: {
        login: isAuthenticatedMiddleware,
        account: isAuthenticatedMiddleware,
        event: isAuthenticatedMiddleware,
    },
};

module.exports = {
    endpointsMiddleware,
};
