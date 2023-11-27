import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { partnerService } from "../service/index.js";

export const createPartner = catchAsyncError(async(req,res) => {
    let { companyWebsite,image } = req.body;
    if(!companyWebsite) {
        sendErrResponseByMsg(res,'Company Website is required',HttpStatus.BAD_REQUEST)
    }
    if(!image) {
        sendErrResponseByMsg(res,'Image is required',HttpStatus.BAD_REQUEST)
    }

    let data = await partnerService.createPartnerService(req.body,res);

    successResponseData({
        res:res,
        message : "Partner is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedPartner = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await partnerService.getSpecifiedPartnerService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Partner Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Partner Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllPartner = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await partnerService.getAllPartnerService
    next()
})

export const updatePartner = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await partnerService.updatePartnerService({data : body,id});
    successResponseData({
        res : res,
        message : `Partner with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deletePartner = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await partnerService.deletePartnerService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Partner Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Partner with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})