import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import { router as api } from "./routes/index.js"
import { notFound } from "./middleware/not-found.js"
import { errorHandler } from "./middleware/error-handler.js"

export function createApp() {
  const app = express()

  app.use(helmet())
  app.use(express.json({ limit: "1mb" }))
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"],
      credentials: true,
    }),
  )
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"))

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
  })
  app.use("/api", limiter)

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "green-ledger-backend", ts: Date.now() })
  })

  app.use("/api", api)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
