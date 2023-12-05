import { Router } from "express";
import { userController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const userRouter = Router()

userRouter
    .route("/register")
    .post(userController.createUser)

userRouter
    .route("/login")
    .post(userController.loginUser)

export default userRouter;