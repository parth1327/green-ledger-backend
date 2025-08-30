import { Router } from "express"
import { listBudgets, upsertBudget, deleteBudget } from "../controllers/budgets.controller.js"

export const budgetsRouter = Router()

budgetsRouter.get("/", listBudgets)
budgetsRouter.post("/", upsertBudget)
budgetsRouter.delete("/:id", deleteBudget)
