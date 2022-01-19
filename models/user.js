const config = require('../config/database')
const mysql2 = require('mysql2')
const sanitizeHtml = require('sanitize-html')
const res = require('express/lib/response')

const connection = mysql2.createConnection(config)
if (!connection) throw new Error

module.exports = {
  insertData: (data) => {
    const cleanData = {
      username: sanitizeHtml(data.username),
      email: sanitizeHtml(data.email),
      password: sanitizeHtml(data.password)
    }

    connection.query(
      `
      INSERT INTO users SET ?
      `, [cleanData]
    )
  },

  getDataBy: async (username) => {
    return await connection.promise().query(
      `
      SELECT * FROM users WHERE username = ?
      `, [username], (err, rows, fiels) => {
      if (err) throw err
      console.log(rows)
      res.json(rows)
    }
    )
  }
}