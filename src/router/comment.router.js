const Router = require("koa-router")
const { createComment, createReply, updateReply } = require("../controller/comment.controller")
const { verifyPermissions, verifyAuthPermissions } = require("../middleware/auth.middleware")

const commentRouter = new Router({ prefix: "/comment" })

commentRouter.post("/", verifyPermissions, createComment)

commentRouter.post("/:commentId/reply", verifyPermissions, createReply)

commentRouter.patch("/:commentId", verifyPermissions, updateReply)

module.exports = commentRouter
