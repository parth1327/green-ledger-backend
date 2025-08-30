import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, default: () => new Date() },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    note: { type: String, trim: true },
  },
  { timestamps: true },
)

TransactionSchema.index({ date: -1 })
TransactionSchema.index({ category: 1, date: -1 })
TransactionSchema.index({ account: 1, date: -1 })

export const Transaction = mongoose.model("Transaction", TransactionSchema)
