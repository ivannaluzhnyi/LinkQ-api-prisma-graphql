const jwt = require("jsonwebtoken");

const { AuthError } = require("./error");

const { APP_SECRET } = require("./config");

const createToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            APP_SECRET,
            {
                algorithm: "HS256",
                expiresIn: 3600,
            },
            (err, token) => {
                if (err) reject();
                else resolve(token);
            }
        );
    });
};

const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, APP_SECRET, (err, decodedToken) => {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });
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
    createToken,
    verifyToken,
    isAuthenticated,
};
