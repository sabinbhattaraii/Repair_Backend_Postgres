import { Router } from "express";
import { trainingController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const trainingRouter = Router()

trainingRouter
    .route('/')
    .post(trainingController.createTraining)
    .get(trainingController.getAllTraining,sortFilterPagination)

trainingRouter
    .route('/:id')
    .get(trainingController.getSpecifiedTraining)
    .patch(trainingController.updateTraining)
    .delete(trainingController.deleteTraining)
    
export default trainingRouter