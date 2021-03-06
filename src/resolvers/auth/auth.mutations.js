const bcrypt = require("bcryptjs");
const { createToken } = require("../../utils/auth");

const { publishLogin } = require("./auth.subscription");

async function signup(_, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.mutation.createAccount({
        data: {
            email: args.email,
            password: password,
            isActive: args.isActive,
            roles: args.roles || ["ROLE_USER"],
            firstname: args.firstname,
            lastname: args.lastname,
            salary: args.salary,
        },
    });

    const token = await createToken({ userId: user.id, email: user.email });

    return {
        token,
        user,
    };
}

async function login(parent, { email, password }, ctx, info) {
    const user = await ctx.prisma.query.account({ where: { email } });

    if (!user) {
        throw new Error(`No such user found for email: ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("Invalid password");
    }

    const token = await createToken({ userId: user.id, email: user.email });

    await publishLogin(ctx, user);

    return {
        token,
        user,
    };
}

module.exports = {
    signup,
    login,
};
