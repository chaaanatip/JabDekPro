const express = require('express')

const pool = require('../config/db')

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, description, price, stock, category_id, image_url } = req.body

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' })
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category_id, image_url]
    )

    res
      .status(201)
      .json({ message: 'Product created', productId: result.insertId })
  } catch (error) {
    console.error('Error:', error)
    res
      .status(500)
      .json({ message: 'Error creating product', error: error.message })
  }
})

// Get all products route
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products')
    res.json(rows)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'Error fetching products' })
  }
})

// Get single product by ID route
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [
      id
    ])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ message: 'Error fetching product' })
  }
})

// Update product route
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, description, price, stock, category_id, image_url } = req.body

  try {
    let updates = []
    let params = []

    if (name) {
      updates.push('name = ?')
      params.push(name)
    }

    if (description) {
      updates.push('description = ?')
      params.push(description)
    }

    if (price) {
      updates.push('price = ?')
      params.push(price)
    }

    if (stock !== undefined) {
      updates.push('stock = ?')
      params.push(stock)
    }

    if (category_id) {
      updates.push('category_id = ?')
      params.push(category_id)
    }

    if (image_url) {
      updates.push('image_url = ?')
      params.push(image_url)
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'Nothing to update' })
    }

    params.push(id) // Add ID for WHERE clause
    const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`

    const [result] = await pool.execute(query, params)

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({ message: 'Product updated successfully' })
  } catch (error) {
    console.error('Error updating product:', error)
    res
      .status(500)
      .json({ message: 'Error updating product', error: error.message })
  }
})

// Delete product route
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [
      id
    ])

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message })
  }
})

module.exports = router
