const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const useRoutes = require("../router")
const { errorHandle } = require("./error-handle")

const app = new Koa()
app.useRoutes = useRoutes

app.use(bodyParser())
app.useRoutes()

// 错误监听处理
app.on("error", errorHandle)

module.exports = app
