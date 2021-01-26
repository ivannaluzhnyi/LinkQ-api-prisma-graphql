const { AuthError } = require("../utils/error");
const { verifyToken, getAuthToken } = require("../utils/auth");

/**
 * @param resolve
 * @param parent
 * @param args
 * @param ctx
 * @param info
 * @returns {Promise<*|boolean>}
 */
const isAuthenticatedMiddleware = async (resolve, parent, args, ctx, info) => {
    if (ctx.user) {
        return await resolve(parent, args, ctx, info);
    }

    try {
        const authToken = getAuthToken(ctx);
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
        console.error("Error: ", error);
        throw new AuthError();
    }
};

/**
 * @type {{isAuthenticatedMiddleware: (function(*, *=, *=, *=, *=): Promise<*|boolean>)}}
 */
module.exports = {
    isAuthenticatedMiddleware,
};
