import { Router } from "express";
import upload from "../middleware/upload.js";
import createFile from "../controller/createFile.js";

const fileUploadRouter = Router()

fileUploadRouter
    .route("/single")
    .post(upload.single("file"),createFile)

export default fileUploadRouter;