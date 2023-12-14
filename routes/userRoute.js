import { Router } from "express";
import { userController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isValidToken } from "../middleware/isValidToken.js";
import validation from "../middleware/validation.js";
import userSchemaValidation from "../validation/userValidation.js";
import loginSchemaValidation from "../validation/loginValidation.js";

const userRouter = Router()

userRouter
    .route("/register")
    .post(validation(userSchemaValidation), userController.createUser)

userRouter
    .route("/login")
    .post(validation(loginSchemaValidation),userController.loginUser)

userRouter
    .route("/logout")
    .post(isValidToken,userController.logoutUser)

userRouter
    .route("/")
    .get(isValidToken,userController.getAllUser,sortFilterPagination)

userRouter
    .route("/my-profile")
    .get(isValidToken,userController.userMyProfile)

userRouter
    .route("/update-profile")
    .patch(isValidToken,userController.updateUser("profile"))

userRouter
    .route("/:id")
    .get(userController.getSpecificUser)

userRouter
    .route("/:id")
    .delete(isValidToken,userController.deleteUser)

export default userRouter;