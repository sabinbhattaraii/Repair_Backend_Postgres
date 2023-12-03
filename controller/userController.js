import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendEmailForCreatedUser } from "../service/emailService.js";
import { userService } from "../service/index.js";
import { hashPassword } from "../utils/hashFunction.js";
import { throwError } from "../utils/throwError.js";

// Register
export const createUser = catchAsyncError(async(req,res,next) => {
    let body = { ...req.body }

    //check if already user exist or not
    let email = body.email;
    let user = await userService.getSpecificUserByAny(email)

    if (user) {
        throwError({
            message: "Duplicate email",
            statusCode: HttpStatus.UNAUTHORIZED
        })
    } else {
        let data = await userService.createUserService(body,res)

        await sendEmailForCreatedUser({
            email : email,
            userName : body.name,
            password : body.password
        })

        successResponseData({
            res,
            message: "User Creation mail has been sent",
            statusCode: HttpStatus.CREATED,
            data
        })
    }
})