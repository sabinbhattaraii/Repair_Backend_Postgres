import { Router } from "express";
import { testimonialController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const testimonialRouter = Router()

testimonialRouter
    .route('/')
    .post(testimonialController.createTestimonial)
    .get(testimonialController.getAllTestimonial,sortFilterPagination)

testimonialRouter
    .route('/:id')
    .get(testimonialController.getSpecifiedTestimonial)
    .patch(testimonialController.updateTestimonial)
    .delete(testimonialController.deleteTestimonial)

export default testimonialRouter