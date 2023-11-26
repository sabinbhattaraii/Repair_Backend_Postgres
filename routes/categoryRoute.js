import { Router } from "express";
import { categoryController } from "../controller/index.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const categoryRouter = Router()

export default categoryRouter