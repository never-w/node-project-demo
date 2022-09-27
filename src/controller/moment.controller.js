const { createMoment, getMomentById, getMomentList, updateMoment, removeMoment } = require("../service/moment.service")

class MomentController {
  async createMoment(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content

    const result = await createMoment(userId, content)
    ctx.body = result
  }

  async momentDetail(ctx, next) {
    const id = ctx.params.momentId
    const result = await getMomentById(id)

    ctx.body = result
  }

  async momentList(ctx, next) {
    const { offset, size } = ctx.query
    const result = await getMomentList(offset, size)

    ctx.body = result
  }

  async momentUpdate(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await updateMoment(content, momentId)

    ctx.body = result
  }

  async momentRemove(ctx, next) {
    const { momentId } = ctx.params
    const result = await removeMoment(momentId)

    ctx.body = result
  }
}

module.exports = new MomentController()
