const Router = require("koa-router")
const { login, success } = require("../controller/auth.controller")
const { verifyAuth, verifyPermissions } = require("../middleware/auth.middleware")

const authRouter = new Router()

authRouter.post("/login", verifyAuth, login)
authRouter.get("/test", verifyPermissions, success)

module.exports = authRouter
