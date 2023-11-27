import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { reviewServices } from "../service/index.js";


export const createReview = catchAsyncError(async(req,res) => {
    let { name,rating,comment } = req.body;
    if(!name) {
        sendErrResponseByMsg(res,'Name is required',HttpStatus.BAD_REQUEST)
    }
    if(!rating) {
        sendErrResponseByMsg(res,'Rating is required',HttpStatus.BAD_REQUEST)
    }
    if(!comment) {
        sendErrResponseByMsg(res,'Comments is required',HttpStatus.BAD_REQUEST)
    }

    let data = await reviewServices.createReviewsService(req.body,res);

    successResponseData({
        res:res,
        message : "Review is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedReview = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await reviewServices.getSpecifiedReviewsService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Review Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Review Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllReview = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await reviewServices.getAllReviewsService
    next()
})

export const updateReview = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await reviewServices.updateReviewsService({data : body,id});
    successResponseData({
        res : res,
        message : `Review with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteReview = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await reviewServices.deleteReviewsService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Review Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Review with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})