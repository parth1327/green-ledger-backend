import { z } from "zod"

export const idParam = z.object({ id: z.string().length(24) })

export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(), // e.g. "-date"
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
})

export const categoryBody = z.object({
  name: z.string().min(1),
  type: z.enum(["income", "expense"]),
  color: z.string().optional(),
})

export const accountBody = z.object({
  name: z.string().min(1),
  type: z.enum(["cash", "bank", "card", "wallet", "other"]).default("bank"),
  balance: z.number().nonnegative().default(0),
  currency: z.string().default("USD"),
})

export const transactionBody = z.object({
  date: z.coerce.date().optional(),
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category: z.string().length(24),
  account: z.string().length(24),
  note: z.string().optional(),
})

export const budgetBody = z.object({
  category: z.string().length(24),
  monthlyLimit: z.number().nonnegative(),
  currency: z.string().default("USD"),
})
