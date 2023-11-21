import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Partners } from "../models/partner.js";

export async function createPartnerService(data, res) {

  const existingPartner = await Partners.findOne({
    where: { companyWebsite: data.companyWebsite },
  });

  if (existingPartner) {
    sendErrResponseByMsg(
      res,
      "Partner with same Company Website already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedPartner = await Partners.create(data);

  return savedPartner;
}

export async function getSpecifiedPartnerService(id) {
  return Partners.findByPk(id);
}

export function getAllPartnerService({
  find = {},
  sort = "createdAt",
  limit = "",
  skip = "",
  select = "",
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

  return Partners.findAll(queryOptions);
}

export async function updatePartnerService({ id, data }) {
  const [_, [updatedPartner]] = await Partners.update(data, {
    where: { id },
    returning: true,
  });

  return updatedPartner;
}

export async function deletePartnerService(id) {

  const recordToDelete = await Partners.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Partner not found" };
  }

  const deletedRows = await Partners.destroy({
    where: { id },
  });

  return recordToDelete;
}