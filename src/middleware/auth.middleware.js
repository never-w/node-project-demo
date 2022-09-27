const jwt = require("jsonwebtoken")
const { PUBLIC_KEY } = require("../app/config")
const { NAME_OR_PASSWORD_IS_REQUIRED, USER_NAME_IS_EXISTS, PASSWORD_IS_ERROR, AUTHORIZATION, UN_PERMISSIONS } = require("../const/error-types")
const { checkMoment } = require("../service/auth.service")
const { getUserByName } = require("../service/user.service")
const handleMd5Password = require("../utils/password-handle")

// 验证用户登录时的密码账户正确与否
const verifyAuth = async (ctx, next) => {
  // 1.获取用户名称和密码
  const { name, password } = ctx.request.body

  // 2.判断用户名称和密码不能为空
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }

  // 获取数据库的该用户数据
  const user = await getUserByName(name)
  // 3.判断用户是否存在
  if (!user[0]) {
    const error = new Error(USER_NAME_IS_EXISTS)
    return ctx.app.emit("error", error, ctx)
  }

  // 4.判断密码是否正确
  if (handleMd5Password(password) !== user[0].password) {
    const error = new Error(PASSWORD_IS_ERROR)
    return ctx.app.emit("error", error, ctx)
  }

  ctx.user = user[0]
  await next()
}

// 验证登陆之后每个接口token对不对
const verifyPermissions = async (ctx, next) => {
  console.log("验证授权的middleware")
  const authorization = ctx.headers.authorization

  if (!authorization) {
    const error = new Error(AUTHORIZATION)
    return ctx.app.emit("error", error, ctx)
  }

  const token = authorization.replace("Bearer ", "")

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(AUTHORIZATION)
    ctx.app.emit("error", error, ctx)
  }
}

const verifyAuthPermissions = async (ctx, next) => {
  const { momentId } = ctx.params
  const { id } = ctx.user

  const isPermissions = await checkMoment(momentId, id)

  if (!isPermissions) {
    const error = new Error(UN_PERMISSIONS)
    return ctx.app.emit("error", error, ctx)
  }

  await next()
}

module.exports = {
  verifyAuth,
  verifyPermissions,
  verifyAuthPermissions,
}
