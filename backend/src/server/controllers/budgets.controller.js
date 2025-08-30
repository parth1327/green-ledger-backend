import { Budget } from "../models/Budget.js"
import { ah } from "../utils/async-handler.js"
import { budgetBody, idParam } from "../utils/validators.js"

export const listBudgets = ah(async (_req, res) => {
  const items = await Budget.find().populate("category").sort({ createdAt: -1 })
  res.json({ items })
})

export const upsertBudget = ah(async (req, res) => {
  const data = budgetBody.parse(req.body)
  const updated = await Budget.findOneAndUpdate({ category: data.category }, data, { new: true, upsert: true })
  res.status(201).json({ item: updated })
})

export const deleteBudget = ah(async (req, res) => {
  const { id } = idParam.parse(req.params)
  await Budget.findByIdAndDelete(id)
  res.status(204).send()
})
