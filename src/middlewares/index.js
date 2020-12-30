const {
    checkByWhereMiddleware,
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
} = require("./permission.middleware");

const { isAuthenticatedMiddleware } = require("./auth.middleware");

const endpointsMiddleware = {
    Mutation: {
        updateAccount: checkByWhereMiddleware,
        deleteAccount: checkByWhereMiddleware,
        createEvent: checkByConnectIdMiddleware,
        updateEvent: checkByWhereMiddleware,
        deleteEvent: checkByWhereMiddleware,
    },
    Query: {
        accounts: checkIsAdminMiddleware,
        account: checkByWhereMiddleware,
        event: checkByWhereMiddleware,
        events: checkIsAdminMiddleware,
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
