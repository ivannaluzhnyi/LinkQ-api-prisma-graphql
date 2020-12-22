const authQueries = require("./auth/auth.queries");
const userQueries = require("./account/account.queries");
const eventQueries = require("./event/event.queries");

module.exports = {
    ...userQueries,
    ...authQueries,
    ...eventQueries,
};
