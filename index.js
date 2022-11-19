import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'

import { create, getAll, getOne, remove, update } from './controllers/TodoController.js'
import { todoCreateValidation } from './validations.js'
import handleValidationErrors from './utils/handleValidationErrors.js'

//Подключение БД
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('Database OK'))
  .catch((err) => console.log('Database error', err))

const app = express()

//Создание хранилища для файлов
const storage = multer.diskStorage({
  // Когда будет создаваться хранилище функция создает папку uploads
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },
  // Файл будет называться своим оригинальным названием
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})
// Переменная позволяющая использовать multer
const upload = multer({ storage })

// Чтобы читать json из запросов
app.use(express.json())
// Чтобы не было ошибок cors
app.use(cors())

//Для возврата статических файлов
app.use('/uploads', express.static('uploads'))

app.get('/todos', getAll)
app.post('/todos', todoCreateValidation, handleValidationErrors, create)
app.get('/todo/:id', getOne)
app.patch('/todo/:id', todoCreateValidation, handleValidationErrors, update)
app.delete('/todo/:id', remove)

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
