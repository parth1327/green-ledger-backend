import { Category } from "../models/Category.js"
import { ah } from "../utils/async-handler.js"
import { categoryBody, idParam } from "../utils/validators.js"

export const listCategories = ah(async (_req, res) => {
  const items = await Category.find().sort({ type: 1, name: 1 })
  res.json({ items })
})

export const createCategory = ah(async (req, res) => {
  const data = categoryBody.parse(req.body)
  const created = await Category.create(data)
  res.status(201).json({ item: created })
})

export const updateCategory = ah(async (req, res) => {
  const { id } = idParam.parse(req.params)
  const data = categoryBody.partial().parse(req.body)
  const updated = await Category.findByIdAndUpdate(id, data, { new: true })
  res.json({ item: updated })
})

export const deleteCategory = ah(async (req, res) => {
  const { id } = idParam.parse(req.params)
  await Category.findByIdAndDelete(id)
  res.status(204).send()
})
