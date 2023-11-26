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