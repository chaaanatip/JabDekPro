const db = require("../config/database")

exports.getAllTodos = function (callback) {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error("Error executing query:", err)
      return callback(err)
    }
    callback(null, results)
  })
}

exports.getTodoById = function (id, callback) {
  db.query("SELECT * FROM todos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err)
      return callback(err)
    }
    callback(null, results[0])
  })
}

exports.createTodo = (req, res) => {
  console.log("Request body:", req.body) // Add this line to inspect the body

  const { id, email, password } = req.body

  if (!id || !email || !password) {
    return res
      .status(400)
      .json({ error: "All fields (id, email, password) are required" })
  }

  const newTodo = { id, email, password }

  Todo.createTodo(newTodo, (err, result) => {
    if (err) {
      console.error("Error creating todo:", err)
      return res.status(500).json({ error: "Error creating todo" })
    }
    res.status(201).json({ message: "Todo created successfully" })
  })
}

exports.updateTodo = function (id, updatedTodo, callback) {
  db.query(
    "UPDATE todos SET ? WHERE id = ?",
    [updatedTodo, id],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err)
        return callback(err)
      }
      callback(null, results)
    }
  )
}

exports.deleteTodo = function (id, callback) {
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err)
      return callback(err)
    }
    callback(null, results)
  })
}
