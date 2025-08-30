import { Transaction } from "../models/Transaction.js"
import { Category } from "../models/Category.js"
import { Account } from "../models/Account.js"
import { ah } from "../utils/async-handler.js"
import { transactionBody, paginationQuery, idParam } from "../utils/validators.js"

export const listTransactions = ah(async (req, res) => {
  const q = paginationQuery.parse(req.query)

  const filter = {}
  if (q.from || q.to) {
    filter.date = {}
    if (q.from) filter.date.$gte = q.from
    if (q.to) filter.date.$lte = q.to
  }
  const sort = q.sort ? Object.fromEntries([[q.sort.replace("-", ""), q.sort.startsWith("-") ? -1 : 1]]) : { date: -1 }

  const [items, total] = await Promise.all([
    Transaction.find(filter)
      .populate("category")
      .populate("account")
      .sort(sort)
      .skip((q.page - 1) * q.limit)
      .limit(q.limit),
    Transaction.countDocuments(filter),
  ])
  res.json({ items, page: q.page, limit: q.limit, total })
})

export const createTransaction = ah(async (req, res) => {
  const data = transactionBody.parse(req.body)
  const [cat, acc] = await Promise.all([Category.findById(data.category), Account.findById(data.account)])
  if (!cat) return res.status(400).json({ error: "InvalidCategory" })
  if (!acc) return res.status(400).json({ error: "InvalidAccount" })

  const created = await Transaction.create(data)
  res.status(201).json({ item: created })
})

export const updateTransaction = ah(async (req, res) => {
  const { id } = idParam.parse(req.params)
  const data = transactionBody.partial().parse(req.body)
  const updated = await Transaction.findByIdAndUpdate(id, data, { new: true })
  res.json({ item: updated })
})

export const deleteTransaction = ah(async (req, res) => {
  const { id } = idParam.parse(req.params)
  await Transaction.findByIdAndDelete(id)
  res.status(204).send()
})
