import { Router } from "express";
import { userController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isValidToken } from "../middleware/isValidToken.js";

const userRouter = Router()

userRouter
    .route("/register")
    .post(userController.createUser)

userRouter
    .route("/login")
    .post(userController.loginUser)

userRouter
    .route("/logout")
    .post(isValidToken,userController.logoutUser)

userRouter
    .route("/")
    .get(isValidToken,userController.getAllUser,sortFilterPagination)

userRouter
    .route("/:id")
    .get(userController.getSpecificUser)

userRouter
    .route("/:id")
    .delete(isValidToken,userController.deleteUser)

export default userRouter;