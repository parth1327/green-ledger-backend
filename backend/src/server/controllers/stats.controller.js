import { Transaction } from "../models/Transaction.js"
import { ah } from "../utils/async-handler.js"
import { paginationQuery } from "../utils/validators.js"

function buildDateMatch(q) {
  const match = {}
  if (q.from || q.to) {
    match.date = {}
    if (q.from) match.date.$gte = q.from
    if (q.to) match.date.$lte = q.to
  }
  return match
}

export const overviewStats = ah(async (req, res) => {
  const q = paginationQuery.parse(req.query)
  const match = buildDateMatch(q)

  const grouped = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: "$type", total: { $sum: "$amount" } } },
  ])

  const income = grouped.find((g) => g._id === "income")?.total || 0
  const expense = grouped.find((g) => g._id === "expense")?.total || 0
  const balance = income - expense

  res.json({ income, expense, balance })
})

export const byCategory = ah(async (req, res) => {
  const q = paginationQuery.parse(req.query)
  const match = { ...buildDateMatch(q) }
  const grouped = await Transaction.aggregate([
    { $match: match },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $group: {
        _id: "$category._id",
        name: { $first: "$category.name" },
        type: { $first: "$category.type" },
        color: { $first: "$category.color" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
  ])
  res.json({ items: grouped })
})

export const monthlySeries = ah(async (req, res) => {
  const months = Math.min(Math.max(Number.parseInt(req.query.months || "6", 10), 1), 24)
  const to = new Date()
  const from = new Date(to)
  from.setMonth(from.getMonth() - (months - 1))
  from.setDate(1)
  from.setHours(0, 0, 0, 0)

  const grouped = await Transaction.aggregate([
    { $match: { date: { $gte: from, $lte: to } } },
    {
      $group: {
        _id: { y: { $year: "$date" }, m: { $month: "$date" }, type: "$type" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.y": 1, "_id.m": 1 } },
  ])

  const map = new Map()
  for (const g of grouped) {
    const key = `${g._id.y}-${String(g._id.m).padStart(2, "0")}`
    const entry = map.get(key) || { month: key, income: 0, expense: 0 }
    entry[g._id.type] = g.total
    map.set(key, entry)
  }
  res.json({ items: Array.from(map.values()) })
})
