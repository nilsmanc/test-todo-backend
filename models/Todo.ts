import mongoose from 'mongoose'

interface Todo extends Document {
  title: string
  description: string
  date: string
  done: boolean
  file: string
}

const TodoSchema = new mongoose.Schema<Todo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  done: Boolean,
  file: String,
})

export default mongoose.model<Todo>('Todo', TodoSchema)
