import { expiryIn, secretKey, tokenTypes } from "../config/sconfig.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import errorMiddleware from "../middleware/errorMiddleware.js";
import { sendEmailForCreatedUser } from "../service/emailService.js";
import { tokenService, userService } from "../service/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";
import { comparePassword, hashPassword } from "../utils/hashFunction.js";
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
      name: body.name,
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
            let infoObj = { userId: user.id, role: user.role }
            let token = await generateToken(infoObj, secretKey, expiryIn)
            console.log(token)

            let data = {
                token: token,
                userId : user.id,
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

// get all user
export const getAllUser = catchAsyncError(async (req, res, next) => {
    let find = {};
    if (req.query.name) {
        find.userName = req.query.name;
    }
    if (req.query.email) {
        find.email = { $regex: req.query.email, $options: "i" };
    }
    if (req.query.roles) {
        find.roles = { $in: req.query.roles.split(",") }
    }
    req.find = find;
    req.service = userService.getAllUserService;
    req.myOwnSelect = "-password";
    next();
})

// GET SPECIFIC USER
export const getSpecificUser = catchAsyncError(async (req,res,next) => {
    let id = req.params.id;
    let data = await userService.getSpecifiedUserService(id);
    if(data){
        delete data._doc.password;
        successResponseData({
            res,
            message: "Read user successfully.",
            statusCode: HttpStatus.OK,
            data,
        })
    } else {
        throwError({
            message : "Could'nt found user.",
            statusCode: HttpStatus.NOT_FOUND,
        });
    }
})

//Delete User
export const deleteUser = catchAsyncError(async(req, res, next) => {
    let id = req.params.id;

    let userId = userService.getSpecifiedUserService(id)

    if(id === userId.id) {
        throwError({
            message : "You can't delete your own account",
            statusCode : HttpStatus.UNAUTHORIZED
        });

        let userdata = await userService.deleteSpecifiedUserService(id)
        delete data?._doc?.password
        successResponseData({
            res,
            message : "User deleted successfully.",
            statusCode : HttpStatus.OK,
            userdata,
        })
    } else {
        throwError({
            message : "Couldn't found user.",
            statusCode : HttpStatus.NOT_FOUND
        })
    }
})