const { createAvatar } = require("../service/file.service")

class FileController {
  async saveAvatarInfo(ctx, next) {
    const { id } = ctx.user
    const { filename, mimetype, size } = ctx.req.file
    const result = await createAvatar(filename, mimetype, size, id)

    ctx.body = result
  }
}

module.exports = new FileController()
