import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Training } from "../models/training.js";
import { Categories } from "../models/category.js";
import { User } from "../models/user.js";

export async function createTrainingService(data, res) {
  const existingTraining = await Training.findOne({
    where: { syllabus: data.syllabus },
  });

  if (existingTraining) {
    sendErrResponseByMsg(
      res,
      "Training with same syllabus already exist",
      HttpStatus.CONFLICT
    );
  }

  const category = await Categories.findByPk(data.category);
  if (!category) {
    sendErrResponseByMsg(res, "Cannot find the category", HttpStatus.NOT_FOUND);
  }

  const user = await User.findByPk(data.user);
  if (!user) {
    sendErrResponseByMsg(res, "Cannot find the user", HttpStatus.NOT_FOUND);
  }

  const savedTraining = await Training.create(data);
  savedTraining.setCategories(category);
  savedTraining.setUser(user);

  return savedTraining;
}

export async function getSpecifiedTrainingService(id) {
  return Training.findByPk(id, { include: [{ model: Categories } ,{ model: User }] });
}

export function getAllTrainingService({
  find = {},
  sort = "createdAt",
  limit = "",
  skip = "",
  select = "",
}) {
  const queryOptions = {
    attributes: select,
    where: find,
    include: ["Categories" , "User"],
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

  return Training.findAll(queryOptions);
}

export async function updateTrainingService({ id, data }) {
  const [_, [updatedTraining]] = await Training.update(data, {
    where: { id },
    returning: true,
  });

  return updatedTraining;
}

export async function deleteTrainingService(id) {
  const recordToDelete = await Training.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Training not found" };
  }

  const deletedRows = await Training.destroy({
    where: { id },
  });

  return recordToDelete;
}