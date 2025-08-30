export function errorHandler(err, _req, res, _next) {
  console.error("[green-ledger] error:", err)
  if (err?.issues?.length) {
    // zod error
    return res.status(400).json({
      error: "ValidationError",
      details: err.issues,
    })
  }
  if (err?.name === "CastError" || err?.name === "ValidationError") {
    return res.status(400).json({ error: err.name, message: err.message })
  }
  res.status(err.status || 500).json({
    error: "ServerError",
    message: process.env.NODE_ENV === "production" ? "Unexpected error" : err.message,
  })
}
