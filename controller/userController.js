import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import errorMiddleware from "../middleware/errorMiddleware.js";
import { sendEmailForCreatedUser } from "../service/emailService.js";
import { tokenService, userService } from "../service/index.js";
import { hashPassword } from "../utils/hashFunction.js";
import { throwError } from "../utils/throwError.js";
import { generateToken } from "../utils/token.js";

// Register
export const createUser = catchAsyncError(async (req, res, next) => {
  let body = { ...req.body };

  //check if already user exist or not
  let email = body.email;
  let user = await userService.getSpecificUserByAny(email);

  if (user) {
    throwError({
      message: "Duplicate email",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  } else {

    //hashing password
    let passHashedPassword = await hashPassword(body.password);
    body.password = passHashedPassword;


    let data = await userService.createUserService(body, res);

    await sendEmailForCreatedUser({
      email: email,
      userName: body.name,
      password: body.password,
    });

    successResponseData({
      res,
      message: "User Creation mail has been sent",
      statusCode: HttpStatus.CREATED,
      data,
    });
  }
});


//login user
export let loginUser = catchAsyncError(async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    let user = await userService.getSpecificUserByAny(email)
    if (user === null) {
        let error = new errorMiddleware("Please enter valid email or password")
        error.statusCode = HttpStatus.UNAUTHORIZED
        throw error
    } else {
        let isValidPassword = await comparePassword(password, user.password)
        if (isValidPassword) {
            let infoObj = { userId: user._id, role: user.role }
            let token = await generateToken(infoObj, secretKey, expiryIn)
            console.log(token)

            let data = {
                token: token,
                type: tokenTypes.ACCESS,
                expiration: getTokenExpiryTime(token).toLocaleString()
            }
            await tokenService.createTokenService(data,res)
            delete user?._doc?.password
            successResponseData({
                res: res,
                message: "Login Successfully",
                statusCode: HttpStatus.OK,
                data: {
                    token: token,
                    user: user,
                }
            })
        } else {
            let error = new Error("Please Enter Valid Email or Password")
            error.statusCode = HttpStatus.UNAUTHORIZED
            throw error
        }
    }
})

// logout user
export const logoutUser = catchAsyncError(async (req, res) => {
    let id = req.token
    await tokenService.deleteSpecifiedTokenService(id)
    successResponseData({
        res: res,
        message: "Logout Sucessfully",
        statusCode: HttpStatus.OK,
    })
})