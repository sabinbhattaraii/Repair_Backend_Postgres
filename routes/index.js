import { Router } from "express";
import categoryRouter from "./categoryRoute.js";
import enquiryRouter from "./enquiryRoute.js";
import feedbackRouter from "./feedbackRoute.js";
import partnerRouter from "./partnerRoute.js";

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
    {
        path : `/feedback`,
        router : feedbackRouter
    },
    {
        path : `/partner`,
        router : partnerRouter
    },
]
ourRoutes.forEach((route) => {
    apiRouter.use(route.path,route.router)
})

export default apiRouter