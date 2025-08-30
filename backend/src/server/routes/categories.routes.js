import { Router } from "express"
import { listCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categories.controller.js"

export const categoriesRouter = Router()

categoriesRouter.get("/", listCategories)
categoriesRouter.post("/", createCategory)
categoriesRouter.patch("/:id", updateCategory)
categoriesRouter.delete("/:id", deleteCategory)
