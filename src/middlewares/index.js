const {
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
    eventMiddleware,
    accountMiddleware,
    applicationMiddleware,
    contractMiddleware
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

        createContract: checkByConnectIdMiddleware,
        updateContract: contractMiddleware
        
    },
    Query: {
        accounts: checkIsAdminMiddleware,
        account: accountMiddleware,

        event: eventMiddleware,
        events: isAuthenticatedMiddleware,

        application: applicationMiddleware,
        applications: isAuthenticatedMiddleware,

        contract: contractMiddleware,
        contracts: isAuthenticatedMiddleware,
    },
    Subscription: {
        login: isAuthenticatedMiddleware,
        account: isAuthenticatedMiddleware,
        event: isAuthenticatedMiddleware,
        application: isAuthenticatedMiddleware,
        contract: isAuthenticatedMiddleware

    },
};

module.exports = {
    endpointsMiddleware,
};
