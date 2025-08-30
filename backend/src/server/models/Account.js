import mongoose from "mongoose"

const AccountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["cash", "bank", "card", "wallet", "other"],
      required: true,
      default: "bank",
    },
    balance: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true },
)

AccountSchema.index({ name: 1 }, { unique: true })

export const Account = mongoose.model("Account", AccountSchema)
