import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { mongoDB } from './variables.js'
import { create, getAll, remove, update } from './controllers/TodoController.js'
import { todoCreateValidation } from './validations.js'
import handleValidationErrors from './utils/handleValidationErrors.js'

mongoose
  .connect(mongoDB)
  .then(() => console.log('Database OK'))
  .catch((err) => console.log('Database error', err))

const app = express()

app.use(express.json())
app.use(cors())

app.get('/todos', getAll)
app.delete('/todos/:id', remove)
app.post('/todos', todoCreateValidation, handleValidationErrors, create)
app.patch('/todos/:id', todoCreateValidation, handleValidationErrors, update)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
