const { verifyToken } = require("../utils/auth");
const { AuthError } = require("../utils/error");

async function getUser(ctx) {
    const Authorization = ctx.req.request.get("Authorization");

    if (Authorization && Authorization !== "null") {
        const token = Authorization.replace("Bearer ", "");
        const { userId } = await verifyToken(token);
        const user = await ctx.prisma.query.account(
            { where: { id: userId } },
            "{ id email roles }"
        );
        return user;
    }

    throw new AuthError();
}

module.exports = {
    getUser,
};
