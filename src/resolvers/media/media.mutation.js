const { forwardTo } = require("prisma-binding");

async function createMedia(parent, args, ctx, info) {
    return forwardTo("prisma")(parent, args, ctx, info);
}

// async function updateUser (parent, args, ctx, info) {
//   return forwardTo('prisma')(parent, args, ctx, info)
// }

module.exports = {
    createMedia,
    // updateUser
};
