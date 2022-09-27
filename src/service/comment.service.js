const connection = require("../app/database")

class CommentService {
  async commentCreate(momentId, content, id) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?);`
    const [result] = await connection.execute(statement, [content, momentId, id])

    return result
  }
  async commentReply(momentId, content, id, commentId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [content, momentId, id, commentId])

    return result
  }
}

module.exports = new CommentService()
