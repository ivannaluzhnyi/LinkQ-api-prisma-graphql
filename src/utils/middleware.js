const { verifyToken } = require("./auth");
const { AuthError } = require("./error");

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

const isAuthenticated = async (ctx) => {
    if (ctx.user) {
        return true;
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

        return true;
    } catch (error) {
        throw new AuthError();
    }
};

module.exports = {
    isAuthenticated,
    isAuthenticatedMiddleware,
};
