import "dotenv/config"
import { createApp } from "./server/app.js"
import { connectDB } from "./server/config/db.js"

const port = process.env.PORT || 4000

async function boot() {
  await connectDB()
  const app = createApp()
  app.listen(port, () => {
    console.log(`[green-ledger] server listening on http://localhost:${port}`)
  })
}

boot().catch((err) => {
  console.error("[green-ledger] failed to start server:", err)
  process.exit(1)
})
