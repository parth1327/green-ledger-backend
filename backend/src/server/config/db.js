import mongoose from "mongoose"

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Missing MONGODB_URI in environment")
  }
  mongoose.set("strictQuery", true)
  await mongoose.connect(uri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 10000,
  })
  console.log("[green-ledger] connected to MongoDB")
}
