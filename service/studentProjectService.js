import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { StudentProject } from "../models/studentProject.js";

export async function createStudentProjectService(data, res) {

  const existingProject = await StudentProject.findOne({
    where: { name: data.name },
  });

  if (existingProject) {
    sendErrResponseByMsg(
      res,
      "Student Project with same Name already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedProject = await StudentProject.create(data);

  return savedProject;
}

export async function getSpecifiedStudentProjectService(id) {
  return StudentProject.findByPk(id);
}

export function getAllStudentProjectService({
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

  return StudentProject.findAll(queryOptions);
}

export async function updateStudentProjectService({ id, data }) {
  const [_, [updatedProject]] = await StudentProject.update(data, {
    where: { id },
    returning: true,
  });

  return updatedProject;
}

export async function deleteStudentProjectService(id) {

  const recordToDelete = await StudentProject.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Student Project not found" };
  }

  const deletedRows = await StudentProject.destroy({
    where: { id },
  });

  return recordToDelete;
}