const { isAuthenticated } = require("../utils/auth");
const { PermissionError } = require("../utils/error");
const {
    checkByWhere,
    checkByConnectId,
    isAdmin,
} = require("../utils/permission");

const checkByWhereMiddleware = async (resolve, parent, args, ctx, info) => {
    const isConnect = await isAuthenticated(ctx);

    if (isConnect) {
        const canGo = checkByWhere(ctx.user, args);
        return canGo
            ? await resolve(parent, args, ctx, info)
            : new PermissionError();
    }
};

const checkByConnectIdMiddleware = async (resolve, parent, args, ctx, info) => {
    const isConnect = await isAuthenticated(ctx);

    if (isConnect) {
        const canGo = checkByConnectId(ctx.user, args);
        return canGo
            ? await resolve(parent, args, ctx, info)
            : new PermissionError();
    }
};

const checkIsAdminMiddleware = async (resolve, parent, args, ctx, info) => {
    const isConnect = await isAuthenticated(ctx);

    if (isConnect) {
        return isAdmin(ctx.user.roles)
            ? await resolve(parent, args, ctx, info)
            : new PermissionError();
    }
};

module.exports = {
    checkByWhereMiddleware,
    checkByConnectIdMiddleware,
    checkIsAdminMiddleware,
};
