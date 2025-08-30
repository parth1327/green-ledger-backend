import { Account } from "../models/Account.js"
import { ah } from "../utils/async-handler.js"
import { accountBody, idParam } from "../utils/validators.js"

export const listAccounts = ah(async (_req, res) => {
  const items = await Account.find().sort({ name: 1 })
  res.json({ items })
})

export const createAccount = ah(async (req, res) => {
  const data = accountBody.parse(req.body)
  const created = await Account.create(data)
  res.status(201).json({ item: created })
})

export const updateAccount = ah(async (req, res) => {
  const { id } = idParam.parse(req.params)
  const data = accountBody.partial().parse(req.body)
  const updated = await Account.findByIdAndUpdate(id, data, { new: true })
  res.json({ item: updated })
})

export const deleteAccount = ah(async (req, res) => {
  const { id } = idParam.parse(req.params)
  await Account.findByIdAndDelete(id)
  res.status(204).send()
})
