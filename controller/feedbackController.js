import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { feedbackService } from "../service/index.js";

export const createFeedBack = catchAsyncError(async(req,res) => {
    let { legalName,email,message,phoneNumber } = req.body;
    if(!legalName) {
        sendErrResponseByMsg(res,'Legal Name is required',HttpStatus.BAD_REQUEST)
    }
    if(!email) {
        sendErrResponseByMsg(res,'Email is required',HttpStatus.BAD_REQUEST)
    }
    if(!message) {
        sendErrResponseByMsg(res,'Message is required',HttpStatus.BAD_REQUEST)
    }
    if(!phoneNumber) {
        sendErrResponseByMsg(res,'Phone Number is required',HttpStatus.BAD_REQUEST)
    }

    let data = await feedbackService.createFeedBackService(req.body,res);

    successResponseData({
        res:res,
        message : "Feed Back is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedFeedBack = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await feedbackService.getSpecifiedFeedBackService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Feed Back Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Feed Back Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllFeedBack = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await feedbackService.getAllFeedBackService
    next()
})

export const updateFeedBack = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await feedbackService.updateFeedBackService({data : body,id});
    successResponseData({
        res : res,
        message : `Feed Back with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteFeedBack = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await feedbackService.deleteFeedBackService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Feed Back Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Feed Back with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})