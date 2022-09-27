const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_UNIQUE, USER_NAME_IS_EXISTS, PASSWORD_IS_ERROR, AUTHORIZATION, UN_PERMISSIONS } = require("../const/error-types")

// 用户名称和密码的错误处理
const errorHandle = (error, ctx) => {
  // 根据不同错误类型常量判断错误
  switch (error.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      ctx.status = 400
      ctx.body = "用户名称或密码不能为空！"
      break
    case NAME_UNIQUE:
      ctx.status = 409
      ctx.body = "用户名称已经被注册过了！"
      break
    case USER_NAME_IS_EXISTS:
      ctx.status = 400
      ctx.body = "用户名不存在请去注册！"
      break
    case PASSWORD_IS_ERROR:
      ctx.status = 400
      ctx.body = "密码不正确！"
      break
    case AUTHORIZATION:
      ctx.status = 401
      ctx.body = "无效token! "
      break
    case UN_PERMISSIONS:
      ctx.status = 401
      ctx.body = "您不具备操作权限! "
      break
    default:
      ctx.status = 404
      ctx.body = "发生错误"
  }
}

module.exports = {
  errorHandle,
}
