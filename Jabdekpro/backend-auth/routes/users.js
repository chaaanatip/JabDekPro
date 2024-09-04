const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const router = express.Router()

// Register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await pool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    )

    res
      .status(201)
      .json({ message: 'User registered', userId: result.insertId })
  } catch (error) {
    console.error('Error:', error)
    res
      .status(500)
      .json({ message: 'Error registering user', error: error.message })
  }
})

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [
      email
    ])
    const user = rows[0]

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' })
  }
})
router.get('/countuser', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT COUNT(id) AS userCount FROM users'
    )
    const count = rows[0].userCount
    res.json({ count })
  } catch (error) {
    console.error('Error fetching user count:', error)
    res.status(500).json({ message: 'Server error' })
  }
})
// Create product route

module.exports = router
