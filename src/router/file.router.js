const Router = require("koa-router")
const { saveAvatarInfo } = require("../controller/file.controller")
const { verifyPermissions } = require("../middleware/auth.middleware")
const avatarHandle = require("../middleware/file.middleware")

const fileRouter = new Router({ prefix: "/upload" })

fileRouter.post("/avatar", verifyPermissions, avatarHandle, saveAvatarInfo)

module.exports = fileRouter
