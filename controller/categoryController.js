import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { categoryService } from "../service/index.js";

export const createCategory = catchAsyncError(async(req,res) => {
    let { courseType } = req.body;
    if(!courseType) {
        sendErrResponseByMsg(res,'Course Type is required',HttpStatus.BAD_REQUEST)
    }

    let data = await categoryService.createCategoryService(req.body,res);

    successResponseData({
        res:res,
        message : "Category is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedCategory = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await categoryService.getSpecifiedCategoryService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Category Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Category Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllCategory = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await categoryService.getAllCategoryService
    next()
})

export const updateCategory = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await categoryService.updateCategoryService({data : body,id});
    successResponseData({
        res : res,
        message : `Category with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteCategory = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await categoryService.deleteCategoryService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Category Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Category with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})