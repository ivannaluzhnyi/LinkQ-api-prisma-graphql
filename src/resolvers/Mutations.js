const authMutations = require("./auth/auth.mutations");
const accountMutations = require("./account/account.mutation");

module.exports = {
    ...authMutations,
    ...accountMutations,
};
