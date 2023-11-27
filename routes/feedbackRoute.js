import { Router } from "express";
import { feedbackController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const feedbackRouter = Router()

feedbackRouter
    .route('/')
    .post(feedbackController.createFeedBack)
    .get(feedbackController.getAllFeedBack,sortFilterPagination)

feedbackRouter
    .route('/:id')
    .get(feedbackController.getSpecifiedFeedBack)
    .patch(feedbackController.updateFeedBack)
    .delete(feedbackController.deleteFeedBack)

export default feedbackRouter