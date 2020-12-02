const jwt = require("jsonwebtoken");
const { AuthError } = require("./error");

async function getUser(ctx) {
    const Authorization = ctx.req.request.get("Authorization");
    if (Authorization && Authorization !== "null") {
        const token = Authorization;
        const { userId } = jwt.verify(token, APP_SECRET);
        const user = await ctx.prisma.query.account(
            { where: { id: userId } },
            "{ id email role }"
        );
        return user;
    } else {
        throw new AuthError();
    }
}

module.exports = {
    getUser,
};
