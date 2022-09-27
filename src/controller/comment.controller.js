const { commentCreate, commentReply } = require("../service/comment.service")

class CommentController {
  async createComment(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await commentCreate(momentId, content, id)

    ctx.body = result
  }

  async createReply(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.params
    const { id } = ctx.user
    const result = await commentReply(momentId, content, id, commentId)

    ctx.body = result
  }

  async updateReply(ctx, next) {
    ctx.body = "sssss"
  }
}

module.exports = new CommentController()
