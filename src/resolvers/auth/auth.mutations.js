const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../utils/config");

async function signup(_, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.mutation.createUser({
        data: {
            name: args.name,
            email: args.email,
            password: password,
        },
    });

    return {
        token: jwt.sign({ userId: user.id }, APP_SECRET),
        user,
    };
}

async function login(parent, { email, password }, ctx, info) {
    const user = await ctx.prisma.query.account(
        { where: { email } },
        "{ id email password }"
    );

    if (!user) {
        throw new Error(`No such user found for email: ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("Invalid password");
    }

    return {
        token: jwt.sign({ userId: user.id }, APP_SECRET),
        user,
    };
}

module.exports = {
    signup,
    login,
};
