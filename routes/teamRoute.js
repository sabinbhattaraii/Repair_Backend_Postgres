import { Router } from "express";
import { teamController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const teamRouter = Router()

teamRouter
    .route('/')
    .post(teamController.createTeam)
    .get(teamController.getAllTeam,sortFilterPagination)

teamRouter
    .route(':/id')
    .get(teamController.getSpecifiedTeam)
    .patch(teamController.updateTeam)
    .delete(teamController.deleteTeam)

export default teamRouter