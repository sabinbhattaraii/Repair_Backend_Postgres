import { Router } from "express";
import { partnerController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const partnerRouter = Router()

partnerRouter
    .route('/')
    .post(partnerController.createPartner)
    .get(partnerController.getAllPartner,sortFilterPagination)

partnerRouter
    .route('/:id')
    .get(partnerController.getSpecifiedPartner)
    .patch(partnerController.updatePartner)
    .delete(partnerController.deletePartner)

export default partnerRouter