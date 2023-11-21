import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { RegisterForm } from "../models/registerForm.js";

export async function createRegisterFormService(data, res) {
    
  const existingRegisterForm = await RegisterForm.findOne({
    where: { email: data.email },
  });

  if (existingRegisterForm) {
    sendErrResponseByMsg(
      res,
      "RegisterForm with same email already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedRegisterForm = await RegisterForm.create(data);

  return savedRegisterForm;
}

export async function getSpecifiedRagisterFormService(id) {
  return RegisterForm.findByPk(id);
}

export function getAllRegisterFormService({
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

  return RegisterForm.findAll(queryOptions);
}

export async function updateRegisterFormService({ id, data }) {
  const [_, [updatedForm]] = await RegisterForm.update(data, {
    where: { id },
    returning: true,
  });

  return updatedForm;
}

export async function deleteRegisterFormService(id) {

  const recordToDelete = await RegisterForm.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Register Form not found" };
  }

  const deletedRows = await RegisterForm.destroy({
    where: { id },
  });

  return recordToDelete;
}