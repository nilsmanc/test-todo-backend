import { validationResult } from 'express-validator'

// Обработка ошибок перед запросом
export default (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }

  next()
}
