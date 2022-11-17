import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { mongoDB } from './variables.js'

mongoose
  .connect(mongoDB)
  .then(() => console.log('Database OK'))
  .catch((err) => console.log('Database error', err))

const app = express()

app.use(cors())

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
