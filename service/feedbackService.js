import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { FeedBacks } from "../models/feedBack.js";

export async function createFeedBackService(data, res) {

  const existingFeedBack = await FeedBacks.findOne({
    where: { message: data.message },
  });

  if (existingFeedBack) {
    sendErrResponseByMsg(
      res,
      "FeedBack with same message already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedFeedBack = await FeedBacks.create(data);

  return savedFeedBack;
}

export async function getSpecifiedFeedBackService(id) {
  return FeedBacks.findByPk(id);
}

export function getAllFeedBackService({
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

  return FeedBacks.findAll(queryOptions);
}

export async function updateFeedBackService({ id, data }) {
  const [_, [updatedFeedBack]] = await FeedBacks.update(data, {
    where: { id },
    returning: true,
  });

  return updatedFeedBack;
}

export async function deleteFeedBackService(id) {

  const recordToDelete = await FeedBacks.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "FeedBack not found" };
  }

  const deletedRows = await FeedBacks.destroy({
    where: { id },
  });

  return recordToDelete;
}