import { Router } from "express"
import { categoriesRouter } from "./categories.routes.js"
import { accountsRouter } from "./accounts.routes.js"
import { transactionsRouter } from "./transactions.routes.js"
import { budgetsRouter } from "./budgets.routes.js"
import { statsRouter } from "./stats.routes.js"

export const router = Router()

router.use("/categories", categoriesRouter)
router.use("/accounts", accountsRouter)
router.use("/transactions", transactionsRouter)
router.use("/budgets", budgetsRouter)
router.use("/stats", statsRouter)
