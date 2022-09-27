const Router = require("koa-router")
const { createMoment, momentDetail, momentList, momentUpdate, momentRemove } = require("../controller/moment.controller")
const { verifyPermissions, verifyAuthPermissions } = require("../middleware/auth.middleware")

const momentRouter = new Router({ prefix: "/moment" })

momentRouter.post("/", verifyPermissions, createMoment)

momentRouter.get("/", momentList)

momentRouter.get("/:momentId", momentDetail)

momentRouter.patch("/:momentId", verifyPermissions, verifyAuthPermissions, momentUpdate)

momentRouter.delete("/:momentId", verifyPermissions, verifyAuthPermissions, momentRemove)

module.exports = momentRouter
