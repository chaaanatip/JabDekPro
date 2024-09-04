const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors') // นำเข้า cors
const dotenv = require('dotenv')
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products') // เพิ่ม router สำหรับ products

dotenv.config()

const app = express()

// ใช้งาน cors
app.use(cors())

app.use(bodyParser.json())
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes) // เพิ่ม router สำหรับ products

module.exports = app
