const {
    checkByWhereMiddleware,
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
} = require("./permission.middleware");

const { AuthError } = require("../utils/auth");

const AUTH_HEADER = "Authorization";

const isAuthenticatedMiddleware = async (resolve, parent, args, ctx, info) => {
    if (ctx.user) {
        const result = await resolve(parent, args, ctx, info);
        return result;
    }

    try {
        const authToken = ctx.req.request
            ? ctx.req.request.get(AUTH_HEADER)
            : ctx.req.request.connection.context.Authorization;

        if (!authToken) return false;

        const token = authToken.replace("Bearer ", "");
        const { userId } = await verifyToken(token);

        const currUser = await ctx.prisma.query.account({
            where: { id: userId },
        });

        ctx.user = currUser;

        const result = await resolve(parent, args, ctx, info);
        return result;
    } catch (error) {
        throw new AuthError();
    }
};

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
    isAuthenticatedMiddleware,
};
