import mongoose from "mongoose"

const BudgetSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, unique: true },
    monthlyLimit: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true },
)

export const Budget = mongoose.model("Budget", BudgetSchema)
