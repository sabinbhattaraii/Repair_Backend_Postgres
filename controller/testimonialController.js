import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { testimonialService } from "../service/index.js";

export const createTestimonial = catchAsyncError(async(req,res) => {
    let { name,image,description,course } = req.body;
    if(!name) {
        sendErrResponseByMsg(res,'Name is required',HttpStatus.BAD_REQUEST)
    }
    if(!image) {
        sendErrResponseByMsg(res,'Image is required',HttpStatus.BAD_REQUEST)
    }
    if(!description) {
        sendErrResponseByMsg(res,'Description is required',HttpStatus.BAD_REQUEST)
    }
    if(!course) {
        sendErrResponseByMsg(res,'Course is required',HttpStatus.BAD_REQUEST)
    }

    let data = await testimonialService.createTestimonialService(req.body,res);

    successResponseData({
        res:res,
        message : "Category is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedTestimonial = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await testimonialService.getSpecifiedTestimonialService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Testimonial Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Testimonial Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllTestimonial = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await testimonialService.getAllTestimonialService
    next()
})

export const updateTestimonial = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await testimonialService.updateTestimonialService({data : body,id});
    successResponseData({
        res : res,
        message : `Testimonial with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteTestimonial = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await testimonialService.deleteTestimonialService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Testimonial Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Testimonial with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})