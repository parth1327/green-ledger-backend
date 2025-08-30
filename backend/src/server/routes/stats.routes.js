import { Router } from "express"
import { overviewStats, byCategory, monthlySeries } from "../controllers/stats.controller.js"

export const statsRouter = Router()

statsRouter.get("/overview", overviewStats)
statsRouter.get("/by-category", byCategory)
statsRouter.get("/monthly", monthlySeries)
