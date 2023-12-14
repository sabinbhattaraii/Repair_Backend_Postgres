import { Router } from "express";
import { categoryController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import validation from "../middleware/validation.js";
import categorySchemaValidation from "../validation/categoryValidation.js";

const categoryRouter = Router()

categoryRouter
    .route('/')
    .post(validation(categorySchemaValidation),categoryController.createCategory)
    .get(categoryController.getAllCategory,sortFilterPagination)

categoryRouter
    .route('/:id')
    .get(categoryController.getSpecifiedCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

export default categoryRouter