const app = require("./app")
const config = require("./app/config")

app.listen(config.APP_PORT, () => {
  console.log("监听成功!!!" + "端口号" + config.APP_PORT)
})
