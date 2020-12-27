const { forwardTo } = require("prisma-binding");
const { publishUpdate, publishDelete } = require("./account.subscriptions");

async function updateAccount(parent, args, ctx, info) {
    const response = await forwardTo("prisma")(parent, args, ctx, info);
    await publishUpdate(ctx, args);

    return response;
}

async function deleteAccount(parent, args, ctx, info) {
    await publishDelete(ctx, args);
    return forwardTo("prisma")(parent, args, ctx, info);
}

module.exports = {
    updateAccount,
    deleteAccount,
};
