import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      default: "expense",
    },
    color: { type: String, default: "#16a34a" }, // optional color tag
  },
  { timestamps: true },
)

CategorySchema.index({ name: 1, type: 1 }, { unique: true })

export const Category = mongoose.model("Category", CategorySchema)
