const mysql2 = require("mysql2")

const connection = mysql2.createPool({
  host: "localhost",
  port: 3306,
  database: "wyqdata",
  user: "root",
  password: "19981129Wyq",
})

// 这段代码用于验证数据库连接成功没有。。。
connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("数据库链接失败！！！")
    } else {
      console.log("数据库链接成功！！！")
    }
  })
})

module.exports = connection.promise()
