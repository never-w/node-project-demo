const { getAvatarUserById } = require("../service/file.service")
const service = require("../service/user.service")
const fs = require("fs")

class UserController {
  async create(ctx, next) {
    // 获取用户传递参数
    const user = ctx.request.body

    // 查询数据
    const result = await service.create(user)

    // 返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const userId = ctx.params.user
    const avatarInfo = await getAvatarUserById(userId)
    ctx.response.set("content-type", avatarInfo.mimetype)
    const res = fs.createReadStream("./uploads/avatar" + "/" + avatarInfo.filename)

    ctx.body = res
  }
}

module.exports = new UserController()
