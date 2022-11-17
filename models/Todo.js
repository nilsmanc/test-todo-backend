import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema(
  {
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
    file: String,
  },
  { timestamps: true },
)

export default mongoose.model('Todo', TodoSchema)
