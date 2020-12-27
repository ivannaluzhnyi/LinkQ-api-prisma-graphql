const { ROLES } = require("../constants/enums");
const { PermissionError } = require("./error");

const isAdmin = (roles) => roles.includes(ROLES.ROLE_ADMIN);
const isUser = (roles) => roles.includes(ROLES.ROLE_USER);

// (user, args) => {
//     const { roles } = user;

//     if (!isAdmin(roles)) {
//         return isUser(roles) ? user.id === args.where.id : false;
//     }

//     return true;
// };

const checkByWhere = async (parent, args, ctx, info) => {
    console.log("ctx. user=checkByWhere> ", ctx.user);
    return true;
};

const checkByConnectId = (user, args) => {
    const { roles } = user;

    if (!isAdmin(roles)) {
        return isUser(roles) ? user.id === args.data.owener.connect.id : false;
    }

    return true;
};

const permissionMiddleware = (check) => {
    if (!check) {
        throw new PermissionError();
    }
};

module.exports = {
    isAdmin,
    checkByWhere,
    permissionMiddleware,
    checkByConnectId,
};
