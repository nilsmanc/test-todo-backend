import { body } from 'express-validator'

export const todoCreateValidation = [
  body('title', 'Enter the title').isString().isLength({ min: 1 }),
  body('description', 'Enter description').isString().isLength({ min: 1 }),
]
