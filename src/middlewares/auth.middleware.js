const { AuthError } = require("../utils/error");
const { verifyToken } = require("../utils/auth");

const { checkByWhere } = require("../utils/permission");

const getUser = async (req, prisma) => {
    const Authorization = req.request.get("Authorization");

    if (Authorization && Authorization !== null) {
        const token = Authorization.replace("Bearer ", "");

        const { userId } = await verifyToken(token);
        const user = await prisma.query.account({ where: { id: userId } });
        return user;
    }

    return null;
};

const AUTH_HEADER = "Authorization";

const isAuthenticated = async (resolve, parent, args, ctx, info) => {
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
        console.log("error => ", error);

        throw new AuthError();
    }
};

const permissions = {
    Mutation: {
        updateAccount: isAuthenticated,
    },
    Query: {
        account: isAuthenticated,
    },
};

module.exports = {
    permissions,
};
