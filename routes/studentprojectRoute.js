import { Router } from "express";
import { studentProjectController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const projectsRouter = Router()

projectsRouter
    .route('/')
    .post(studentProjectController.createProject)
    .get(studentProjectController.getAllProject,sortFilterPagination)

projectsRouter
    .route('/:id')
    .get(studentProjectController.getSpecifiedProject)
    .patch(studentProjectController.updateProject)
    .delete(studentProjectController.deleteProject)

export default projectsRouter