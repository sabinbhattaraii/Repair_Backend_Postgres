import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { studentProjectService } from "../service/index.js";

export const createProject = catchAsyncError(async(req,res) => {
    let { title,name,description,image } = req.body;
    if(!title) {
        sendErrResponseByMsg(res,'Title is required',HttpStatus.BAD_REQUEST)
    }
    if(!name) {
        sendErrResponseByMsg(res,'Name is required',HttpStatus.BAD_REQUEST)
    }
    if(!description) {
        sendErrResponseByMsg(res,'Description is required',HttpStatus.BAD_REQUEST)
    }
    if(!image) {
        sendErrResponseByMsg(res,'Image is required',HttpStatus.BAD_REQUEST)
    }

    let data = await studentProjectService.createStudentProjectService(req.body,res);

    successResponseData({
        res:res,
        message : "Project is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedProject = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await studentProjectService.getSpecifiedStudentProjectService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Student Project Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Student Project Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllProject = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await studentProjectService.getAllStudentProjectService
    next()
})

export const updateProject = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await studentProjectService.updateStudentProjectService({data : body,id});
    successResponseData({
        res : res,
        message : `Project with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteProject = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await studentProjectService.deleteStudentProjectService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Project Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Project with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})