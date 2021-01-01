const {
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
    eventMiddleware,
    accountMiddleware,
    applicationMiddleware
} = require("./permission.middleware");

const { isAuthenticatedMiddleware } = require("./auth.middleware");

const endpointsMiddleware = {
    Mutation: {
        updateAccount: accountMiddleware,
        deleteAccount: accountMiddleware,

        createEvent: checkByConnectIdMiddleware,
        updateEvent: eventMiddleware,
        deleteEvent: eventMiddleware,

        createApplication: checkByConnectIdMiddleware,
        updateApplication: applicationMiddleware,
        
    },
    Query: {
        accounts: checkIsAdminMiddleware,
        account: accountMiddleware,

        event: eventMiddleware,
        events: isAuthenticatedMiddleware,

        application: applicationMiddleware,
        applications: isAuthenticatedMiddleware,
    },
    Subscription: {
        login: isAuthenticatedMiddleware,
        account: isAuthenticatedMiddleware,
        event: isAuthenticatedMiddleware,
        application: isAuthenticatedMiddleware
    },
};

module.exports = {
    endpointsMiddleware,
};
