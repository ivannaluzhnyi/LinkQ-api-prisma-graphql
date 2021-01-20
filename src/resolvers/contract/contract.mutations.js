const { publishContractByType } = require("./contract.subscriptions");
const { SubscriptionActionTypes } = require("../../constants/enums");

const { isAdmin } = require("../../utils/permission");

async function createContract(parent, args, ctx, info) {
    const nextArgs = { ...args };

    const { roles, id: userId } = ctx.user;

    if (!isAdmin(roles)) {
        nextArgs.data.buyer.connect.id = userId;
    }

    const createdContract = await ctx.prisma.mutation.createContract(args);

    console.log("createdContract => ", createdContract);
    await publishContractByType(
        ctx,
        createdContract,
        SubscriptionActionTypes.CREATE
    );
    return createdContract;
}

async function updateContract(parent, args, ctx, info) {
    const updatedContract = await ctx.prisma.mutation.updateContract(args);
    await publishContractByType(
        ctx,
        updatedContract,
        SubscriptionActionTypes.UPDATE
    );

    return updatedContract;
}

async function deleteContract(parent, args, ctx, info) {
    const deletedContract = await ctx.prisma.mutation.deleteContract(args);
    await publishContractByType(
        ctx,
        deletedContract,
        SubscriptionActionTypes.DELETE
    );

    return deletedContract;
}

module.exports = {
    updateContract,
    deleteContract,
    createContract,
};