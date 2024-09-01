const express = require("express")
const app = express()

// Middleware to parse JSON
app.use(express.json())

// Your routes and other code

module.exports = function errorHandler(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
}
