const authMutations = require("./auth/auth.mutations");
const accountMutations = require("./account/account.mutations");
const eventMutations = require("./event/event.mutations");

module.exports = {
    ...authMutations,
    ...accountMutations,
    ...eventMutations,
};
