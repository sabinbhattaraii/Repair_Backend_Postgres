import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Enquiry } from "../models/enquiry.js";

export async function createEnquiryService(data,res){

    const existingEnquiry = await Enquiry.findOne({
        where : { email : data.email},
    });

    if(existingEnquiry) {
        sendErrResponseByMsg(
            res,
            "Enquiry with same email already exists",
            HttpStatus.CONFLICT
        );
    }

    const savedEnquiry = await Enquiry.create(data);

    return savedEnquiry;
}

export async function getSpecifiedEnqiuryService(id) {
    return Enquiry.findByPk(id);
}

export function getAllEnquiryService({
    find = {},
    sort = "createdAt",
    limit = "",
    skip = "",
    select = ""
  }) {
    const queryOptions = {
      attributes: select,
      where: find,
    };
  
    if (sort) {
      queryOptions.order = [[sort]];
    }
  
    if (limit) {
      queryOptions.limit = parseInt(limit);
    }
  
    if (skip) {
      queryOptions.offset = parseInt(skip);
    }
  
    return Enquiry.findAll(queryOptions);
}

export async function updateEnquiryService({ id,data }){
    const [_,[updatedEnquiry]] = await Enquiry.update(data,{
        where : { id },
        returning : true,
    });

    return updatedEnquiry;
}

export async function deleteEnquiryService(id) {

    const recordToDelete = await Enquiry.findByPk(id);

    if(!recordToDelete) {
        return { success : false, message: "Enquiry not found"};
    }

    const deletedRows = await Enquiry.destroy({
        where : { id },
    });

    return recordToDelete;
}