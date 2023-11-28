import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { trainingService } from "../service/index.js";

export const createTraining = catchAsyncError(async(req,res) => {
    let { title,description,career,syllabus,duration,priority,image,ratings,numOfReviews } = req.body;
    if(!title) {
        sendErrResponseByMsg(res,'Title is required',HttpStatus.BAD_REQUEST)
    }
    if(!description) {
        sendErrResponseByMsg(res,'Description is required',HttpStatus.BAD_REQUEST)
    }
    if(!career) {
        sendErrResponseByMsg(res,'Career is required',HttpStatus.BAD_REQUEST)
    }
    if(!syllabus) {
        sendErrResponseByMsg(res,'Syllabus is required',HttpStatus.BAD_REQUEST)
    }
    if(!duration) {
        sendErrResponseByMsg(res,'Duration is required',HttpStatus.BAD_REQUEST)
    }
    if(!priority) {
        sendErrResponseByMsg(res,'Priority is required',HttpStatus.BAD_REQUEST)
    }
    if(!image) {
        sendErrResponseByMsg(res,'Image is required',HttpStatus.BAD_REQUEST)
    }
    if(!ratings) {
        sendErrResponseByMsg(res,'Ratings is required',HttpStatus.BAD_REQUEST)
    }
    if(!numOfReviews) {
        sendErrResponseByMsg(res,'Number of Reviews is required',HttpStatus.BAD_REQUEST)
    }

    let data = await trainingService.createTrainingService(req.body,res);

    successResponseData({
        res:res,
        message : "Training is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedTraining = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await trainingService.getSpecifiedTrainingService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Training Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Training Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllTraining = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await trainingService.getAllTrainingService
    next()
})

export const updateTraining = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await trainingService.updateTrainingService({data : body,id});
    successResponseData({
        res : res,
        message : `Training with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteTraining = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await trainingService.deleteTrainingService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Training Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Training with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})