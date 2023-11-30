import successResponseData from "../helper/successResponseData.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { userService } from "../service/index.js";
import { hashPassword } from "../utils/hashFunction.js";

export const createUser = catchAsyncError(async (req, res, next) => {
    let body = { ...req.body }

    //hashing password
    let passHashedPassword = await hashPassword(body.password)
    body.password = passHashedPassword

    let data = await userService.createUserService({ body })

    successResponseData({
        res: res,
        data,
        message: "User created successfully",
        statusCode: HttpStatus.CREATED
    })
})