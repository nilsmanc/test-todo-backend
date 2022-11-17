import TodosModel from '../models/Todo.js'

export const getAll = async (req, res) => {
  try {
    const todos = await TodosModel.find().exec()

    res.json(todos)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to get todos',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const todoId = req.params.id

    const todo = await TodosModel.findById(todoId).exec()
    res.json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to get todo',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new TodosModel({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      file: req.body.file,
    })

    const todo = await doc.save()

    res.json(todo)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Failed to create todo',
    })
  }
}

export const update = async (req, res) => {
  try {
    const todoId = req.params.id

    await TodosModel.updateOne(
      {
        _id: todoId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        file: req.body.file,
      },
    )

    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to update todo',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const todoId = req.params.id

    TodosModel.findOneAndDelete(
      {
        _id: todoId,
      },
      (err, doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Todo not found',
          })
        }

        res.json({
          success: true,
        })
      },
    )
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Failed to delete todo',
    })
  }
}
