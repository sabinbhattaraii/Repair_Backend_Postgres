import { Router } from "express";
import { categoryController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const categoryRouter = Router()

categoryRouter
    .route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategory,sortFilterPagination)

categoryRouter
    .route('/:id')
    .get(categoryController.getSpecifiedCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

export default categoryRouter