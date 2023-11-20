import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Categories } from "../models/category.js";

export async function createCategoryService(data, res) {

  const existingCategory = await Categories.findOne({
    where: { courseType: data.courseType },
  });

  if (existingCategory) {
    sendErrResponseByMsg(
      res,
      "Category with same courseType already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedCategory = await Categories.create(data);

  return savedCategory;
}

export async function getSpecifiedCategoryService(id) {
  return Categories.findByPk(id);
}

export function getAllCategoryService({
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

  return Categories.findAll(queryOptions);
}

export async function updateCategoryService({ id, data }) {
  const [_, [updatedCategory]] = await Categories.update(data, {
    where: { id },
    returning: true,
  });

  return updatedCategory;
}

export async function deleteCategoryService(id) {

  const recordToDelete = await Categories.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Category not found" };
  }

  const deletedRows = await Categories.destroy({
    where: { id },
  });

  return recordToDelete;
}