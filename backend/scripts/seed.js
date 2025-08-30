import "dotenv/config"
import mongoose from "mongoose"
import { Category } from "../src/server/models/Category.js"
import { Account } from "../src/server/models/Account.js"
import { Transaction } from "../src/server/models/Transaction.js"
import { Budget } from "../src/server/models/Budget.js"

async function run() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("Missing MONGODB_URI")
  await mongoose.connect(uri)
  console.log("[seed] connected")

  await Promise.all([
    Transaction.deleteMany({}),
    Category.deleteMany({}),
    Account.deleteMany({}),
    Budget.deleteMany({}),
  ])

  const categories = await Category.insertMany([
    { name: "Salary", type: "income", color: "#0ea5e9" },
    { name: "Freelance", type: "income", color: "#22c55e" },
    { name: "Groceries", type: "expense", color: "#ef4444" },
    { name: "Rent", type: "expense", color: "#f97316" },
    { name: "Utilities", type: "expense", color: "#a855f7" },
    { name: "Transport", type: "expense", color: "#06b6d4" },
  ])

  const accounts = await Account.insertMany([
    { name: "Main Bank", type: "bank", balance: 0, currency: "USD" },
    { name: "Cash Wallet", type: "cash", balance: 0, currency: "USD" },
  ])

  const byName = Object.fromEntries(categories.map((c) => [c.name, c]))
  const accByName = Object.fromEntries(accounts.map((a) => [a.name, a]))

  const today = new Date()
  const tx = [
    {
      date: offset(today, -12),
      amount: 3500,
      type: "income",
      category: byName["Salary"]._id,
      account: accByName["Main Bank"]._id,
      note: "Monthly salary",
    },
    {
      date: offset(today, -10),
      amount: 600,
      type: "income",
      category: byName["Freelance"]._id,
      account: accByName["Main Bank"]._id,
      note: "Side project",
    },
    {
      date: offset(today, -9),
      amount: 120,
      type: "expense",
      category: byName["Groceries"]._id,
      account: accByName["Cash Wallet"]._id,
      note: "Weekly groceries",
    },
    {
      date: offset(today, -8),
      amount: 1200,
      type: "expense",
      category: byName["Rent"]._id,
      account: accByName["Main Bank"]._id,
      note: "Monthly rent",
    },
    {
      date: offset(today, -7),
      amount: 150,
      type: "expense",
      category: byName["Utilities"]._id,
      account: accByName["Main Bank"]._id,
      note: "Electricity + water",
    },
    {
      date: offset(today, -3),
      amount: 35,
      type: "expense",
      category: byName["Transport"]._id,
      account: accByName["Cash Wallet"]._id,
      note: "Metro card",
    },
  ]

  await Transaction.insertMany(tx)

  await Budget.insertMany([
    { category: byName["Groceries"]._id, monthlyLimit: 400 },
    { category: byName["Transport"]._id, monthlyLimit: 150 },
    { category: byName["Utilities"]._id, monthlyLimit: 250 },
  ])

  console.log("[seed] done")
  await mongoose.disconnect()
}

function offset(base, days) {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  d.setHours(12, 0, 0, 0)
  return d
}

run().catch((e) => {
  console.error("[seed] error:", e)
  process.exit(1)
})
