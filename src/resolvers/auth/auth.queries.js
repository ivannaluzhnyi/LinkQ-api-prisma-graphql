const { getUser } = require("../../utils/helpers.resolvers");

async function me(parent, args, ctx, info) {
    const user = await getUser(ctx);
    return user;
}

module.exports = {
    me,
};
