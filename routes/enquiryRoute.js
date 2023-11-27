import { Router } from "express";
import { enquiryController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const enquiryRouter = Router()

enquiryRouter
    .route('/')
    .post(enquiryController.createEnquiry)
    .get(enquiryController.getAllEnquiry,sortFilterPagination)

enquiryRouter
    .route('/:id')
    .get(enquiryController.getSpecifiedEnquiry)
    .patch(enquiryController.updateEnquiry)
    .delete(enquiryController.deleteEnquiry)

export default enquiryRouter