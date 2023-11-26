import { Router } from "express";
import categoryRouter from "./categoryRoute.js";

const apiRouter = Router()

const ourRoutes = [
    {
        path : `/category`,
        router : categoryRouter
    },

]
ourRoutes.forEach((route) => {
    apiRouter.use(route.path,route.router)
})

export default apiRouter