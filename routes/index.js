import { Router } from "express";
import categoryRouter from "./categoryRoute.js";
import enquiryRouter from "./enquiryRoute.js";
import feedbackRouter from "./feedbackRoute.js";
import partnerRouter from "./partnerRoute.js";
import registerformRouter from "./registerformRoute.js";
import reviewRouter from "./reviewRoute.js";
import testimonialRouter from "./testimonialRoute.js";
import projectsRouter from "./studentprojectRoute.js";
import teamRouter from "./teamRoute.js";
import trainingRouter from "./trainingRoute.js";
import userRouter from "./userRoute.js";
import fileUploadRouter from "./fileUploadRoute.js";

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
    {
        path : `/registerform`,
        router : registerformRouter
    },
    {
        path : `/review`,
        router : reviewRouter
    },
    {
        path : `/testimonial`,
        router : testimonialRouter
    },
    {
        path : `/projects`,
        router : projectsRouter
    },
    {
        path : `/teams`,
        router : teamRouter
    },
    {
        path : `/training`,
        router : trainingRouter
    },
    {
        path : `/user`,
        router : userRouter
    },
    {
        path : `/file`,
        router : fileUploadRouter
    },
]
ourRoutes.forEach((route) => {
    apiRouter.use(route.path,route.router)
})

export default apiRouter