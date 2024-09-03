const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors") // นำเข้า cors
const dotenv = require("dotenv")
const userRoutes = require("./routes/users")

dotenv.config()

const app = express()

// ใช้งาน cors
app.use(cors())

app.use(bodyParser.json())
app.use("/api/users", userRoutes)

module.exports = app
