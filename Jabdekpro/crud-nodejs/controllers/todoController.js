const Todo = require("../models/todo")

exports.getAllTodos = (req, res) => {
  Todo.getAllTodos((err, todos) => {
    if (err) {
      console.error("Error fetching todos:", err)
      return res.status(500).json({ error: "Error retrieving todos" })
    }
    res.json(todos)
  })
}

exports.getTodoById = (req, res) => {
  Todo.getTodoById(req.params.id, (err, todo) => {
    if (err) {
      console.error("Error fetching todo:", err)
      return res.status(500).json({ error: "Error retrieving todo" })
    }
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" })
    }
    res.json(todo)
  })
}

exports.createTodo = (req, res) => {
  const { id, email, password } = req.body

  if (!id || !email || !password) {
    return res
      .status(400)
      .json({ error: "All fields (id, email, password) are required" })
  }

  const newTodo = {
    id,
    email,
    password,
  }

  Todo.createTodo(newTodo, (err, result) => {
    if (err) {
      console.error("Error creating todo:", err)
      return res.status(500).json({ error: "Error creating todo" })
    }
    res.status(201).json({ message: "Todo created successfully" })
  })
}

exports.updateTodo = (req, res) => {
  const updatedTodo = {
    title: req.body.title,
    completed: req.body.completed,
  }

  Todo.updateTodo(req.params.id, updatedTodo, (err, result) => {
    if (err) {
      console.error("Error updating todo:", err)
      return res.status(500).json({ error: "Error updating todo" })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" })
    }
    res.json({ message: "Todo updated successfully" })
  })
}

exports.deleteTodo = (req, res) => {
  Todo.deleteTodo(req.params.id, (err, result) => {
    if (err) {
      console.error("Error deleting todo:", err)
      return res.status(500).json({ error: "Error deleting todo" })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" })
    }
    res.json({ message: "Todo deleted successfully" })
  })
}
