import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { enquiryService } from "../service/index.js";

export const createEnquiry = catchAsyncError(async(req,res) => {
    let {legalName,email,message,phoneNumber,course} = req.body;
    if(!legalName) {
        sendErrResponseByMsg(res,"Legal Name is required",HttpStatus.BAD_GATEWAY);
    }
    if(!email){
        sendErrResponseByMsg(res,"Email is required",HttpStatus.BAD_GATEWAY)
    }
    if(!message){
        sendErrResponseByMsg(res,"Message is required",HttpStatus.BAD_GATEWAY)
    }
    if(!phoneNumber){
        sendErrResponseByMsg(res,"Phone Number is required",HttpStatus.BAD_GATEWAY)
    }
    if(!course){
        sendErrResponseByMsg(res,"Course is required",HttpStatus.BAD_GATEWAY)
    }

    let data = await enquiryService.createEnquiryService(req.body,res);

    successResponseData({
        res : res,
        message : "Enquiry is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedEnquiry = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await enquiryService.getSpecifiedEnqiuryService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Enquiry Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Enquiry Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllEnquiry = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await enquiryService.getAllEnquiryService
    next()
})

export const updateEnquiry = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await enquiryService.updateEnquiryService({ data : body,id });
    successResponseData({
        res : res,
        message : `Enquiry with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteEnquiry = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await enquiryService.deleteEnquiryService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Enquiry Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Enquiry with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})