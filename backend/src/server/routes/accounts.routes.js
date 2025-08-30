import { Router } from "express"
import { listAccounts, createAccount, updateAccount, deleteAccount } from "../controllers/accounts.controller.js"

export const accountsRouter = Router()

accountsRouter.get("/", listAccounts)
accountsRouter.post("/", createAccount)
accountsRouter.patch("/:id", updateAccount)
accountsRouter.delete("/:id", deleteAccount)
