const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_UNIQUE } = require("../const/error-types")
const { getUserByName } = require("../service/user.service")
const handleMd5Password = require("../utils/password-handle")

// 验证用户和密码
const verifyUser = async (ctx, next) => {
  // 1.获取用户名称和密码
  const { name, password } = ctx.request.body

  // 2.判断用户名称和密码不能为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }

  // 3.判断这次注册的用户名有没有被注册过
  const result = await getUserByName(name)
  if (result.length) {
    const error = new Error(NAME_UNIQUE)
    return ctx.app.emit("error", error, ctx)
  }

  await next()
}

// 加密密码
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = handleMd5Password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}
