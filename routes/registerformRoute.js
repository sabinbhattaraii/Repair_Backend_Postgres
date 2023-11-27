import { Router } from "express";
import { registerformController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const registerformRouter = Router()

registerformRouter
    .route('/')
    .post(registerformController.createRegisterForm)
    .get(registerformController.getAllRegisterForm,sortFilterPagination)

registerformRouter
    .route('/:id')
    .get(registerformController.getSpecifiedRegisterForm)
    .patch(registerformController.updateRegisterForm)
    .delete(registerformController.deleteRegisterForm)

export default registerformRouter