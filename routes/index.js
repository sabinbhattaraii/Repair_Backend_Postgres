import { Router } from "express";
import categoryRouter from "./categoryRoute.js";
import enquiryRouter from "./enquiryRoute.js";

const apiRouter = Router()

const ourRoutes = [
    {
        path : `/category`,
        router : categoryRouter
    },
    {
        path : `/enquiry`,
        router : enquiryRouter
    },
]
ourRoutes.forEach((route) => {
    apiRouter.use(route.path,route.router)
})

export default apiRouter