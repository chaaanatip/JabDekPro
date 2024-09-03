const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "28282828",
  database: "jabdekpro",
})

module.exports = pool.promise()
