import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { registerFormService } from "../service/index.js";
import { sendMail } from "../utils/sendMail.js";
import { fromEmail } from "../config/sconfig.js";

export const createRegisterForm = catchAsyncError(async(req,res) => {
    let { legalName,email,academicLevel,phoneNumber,course } = req.body;
    if(!legalName) {
        sendErrResponseByMsg(res,'Legal Name is required',HttpStatus.BAD_REQUEST)
    }
    if(!email) {
        sendErrResponseByMsg(res,'Email is required',HttpStatus.BAD_REQUEST)
    }
    if(!academicLevel) {
        sendErrResponseByMsg(res,'Academic Level is required',HttpStatus.BAD_REQUEST)
    }
    if(!phoneNumber) {
        sendErrResponseByMsg(res,'Phone Number is required',HttpStatus.BAD_REQUEST)
    }
    if(!course) {
        sendErrResponseByMsg(res,'Course is required',HttpStatus.BAD_REQUEST)
    }

    let data = await registerFormService.createRegisterFormService(req.body,res);

    sendMail({
        from : `ByteEi <${fromEmail}>`,
        to: [req.body.email],   
        subject: "Email Confirmation",
        html: `
        <div><h3>Mr./Mrs. ${req.body.legalName},</h3>
        <p>You have been successfully registered in ${req.body.course} course</p>
        <p>You will be contacted within 5 business days to update you about the further enrollment process and other related details</p>
        <p>Your registration details are as follows.</p>
        <p>Name: ${req.body.legalName}</p>
        <p>Phone: ${req.body.phoneNumber}</p>
        <p>Course: ${req.body.course}</p>
        </div>
        `,
    });

    successResponseData({
        res:res,
        message : "Category is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedRegisterForm = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await registerFormService.getAllRegisterFormService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Register Form Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Register Form Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllRegisterForm = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await registerFormService.getAllRegisterFormService
    next()
})

export const updateRegisterForm = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await registerFormService.updateRegisterFormService({data : body,id});
    successResponseData({
        res : res,
        message : `Register Form with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteRegisterForm = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await registerFormService.deleteRegisterFormService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Register Form Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Register Form with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})