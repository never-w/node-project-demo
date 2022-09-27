const crypto = require("crypto")

// 对即将存入数据库的密码进行加密
const handleMd5Password = (password) => {
  const md5 = crypto.createHash("md5")
  const result = md5.update(password?.toString()).digest("hex")

  return result
}

module.exports = handleMd5Password
