import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Team } from "../models/team.js";

export async function createTeamService(data, res) {
    
  const existingTeam = await Team.findOne({
    where: { email: data.email },
  });

  if (existingTeam) {
    sendErrResponseByMsg(
      res,
      "Team with same Email Address already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedTeam = await Team.create(data);

  return savedTeam;
}

export async function getSpecifiedTeamService(id) {
  return Team.findByPk(id);
}

export function getAllTeamService({
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

  return Team.findAll(queryOptions);
}

export async function updateTeamService({ id, data }) {
  const [_, [updatedTeam]] = await Team.update(data, {
    where: { id },
    returning: true,
  });

  return updatedTeam;
}

export async function deleteTeamService(id) {

  const recordToDelete = await Team.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Team not found" };
  }

  const deletedRows = await Team.destroy({
    where: { id },
  });

  return recordToDelete;
}