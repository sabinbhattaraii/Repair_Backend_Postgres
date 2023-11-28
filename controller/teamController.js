import { HttpStatus } from "../constant/constant.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import successResponseData from "../helper/successResponseData.js";
import { teamService } from "../service/index.js";

export const createTeam = catchAsyncError(async(req,res) => {
    let { name,image,position,email,socialPlatform } = req.body;
    if(!name) {
        sendErrResponseByMsg(res,'Name is required',HttpStatus.BAD_REQUEST)
    }
    if(!image) {
        sendErrResponseByMsg(res,'Image is required',HttpStatus.BAD_REQUEST)
    }
    if(!position) {
        sendErrResponseByMsg(res,'Position is required',HttpStatus.BAD_REQUEST)
    }
    if(!email) {
        sendErrResponseByMsg(res,'Email is required',HttpStatus.BAD_REQUEST)
    }
    if(!socialPlatform) {
        sendErrResponseByMsg(res,'Platform is required',HttpStatus.BAD_REQUEST)
    }

    let data = await teamService.createTeamService(req.body,res);

    successResponseData({
        res:res,
        message : "Team is created successfully",
        status : HttpStatus.CREATED,
        data
    })
})

export const getSpecifiedTeam = catchAsyncError(async(req,res) => {
    let id = req.params.id
    let data = await teamService.getSpecifiedTeamService(id)
    if(!data) {
        sendErrResponseByMsg(res,"Team Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : 'Specified Team Found',
        status : HttpStatus.OK,
        data
    })
})

export const getAllTeam = catchAsyncError(async(req,res,next) => {
    let find = {}
    req.find = find
    req.service = await teamService.getAllTeamService
    next()
})

export const updateTeam = catchAsyncError(async(req,res,next) => {
    let body = req.body
    let id = req.params.id
    let data = await teamService.updateTeamService({data : body,id});
    successResponseData({
        res : res,
        message : `Team with this ${id} updated successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})

export const deleteTeam = catchAsyncError(async(req,res,next) => {
    let id = req.params.id
    let data = await teamService.deleteTeamService(id);
    if(!data) {
        sendErrResponseByMsg(res,"Team Not Found",HttpStatus.NOT_FOUND)
    }
    successResponseData({
        res : res,
        message : `Team with this ${id} deleted successfully`,
        statusCode : HttpStatus.OK,
        data
    })
})