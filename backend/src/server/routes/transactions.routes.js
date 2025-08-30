import { Router } from "express"
import {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions.controller.js"

export const transactionsRouter = Router()

transactionsRouter.get("/", listTransactions)
transactionsRouter.post("/", createTransaction)
transactionsRouter.patch("/:id", updateTransaction)
transactionsRouter.delete("/:id", deleteTransaction)
