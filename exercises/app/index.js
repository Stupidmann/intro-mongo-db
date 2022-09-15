const express = require('express')
const morgan = require('morgan')
const connect = require('../connect')
const { json, urlencoded } = require('body-parser')
const app = express()
const Todo = require('./todo')

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id
  try {
    const todo = await Todo.findById(todoId)
      .lean()
      .exec()
    res.status(200).send(todo)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({})
      .lean()
      .exec()
    res.status(200).send(todos)
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

app.post('/todo', async (req, res) => {
  const todoToCreate = req.body.todo
  try {
    const createdTodo = await Todo.create(todoToCreate)
    res.status(201).send(createdTodo)
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
})

connect('mongodb://localhost:27017/asd')
  .then(() => app.listen(4000, () => {
    console.log('server on http://localhost:4000')
  }))
  .catch(e => console.error(e))
