const authQueries = require("./auth/auth.queries");
const userQueries = require("./account/account.queries");
const eventQueries = require("./event/event.queries");
const applicationQueries = require('./application/application.queries')
const contractQueries = require('./contract/contract.queries')

module.exports = {
    ...userQueries,
    ...authQueries,
    ...eventQueries,
    ...applicationQueries,
    ...contractQueries
};
