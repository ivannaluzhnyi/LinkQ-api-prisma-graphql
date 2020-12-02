const authQueries = require("./auth/auth.queries");
const userQueries = require("./account/account.queries");

module.exports = {
    ...userQueries,
    ...authQueries,
};
