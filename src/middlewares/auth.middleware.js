const {
    checkByWhereMiddleware,
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
} = require("./permission.middleware");

const permissions = {
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
};

module.exports = {
    permissions,
};
