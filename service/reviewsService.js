import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Reviews } from "../models/reviews.js";
import { User } from "../models/user.js";

export async function createReviewsService(data, res) {

  const existingReview = await Reviews.findOne({
    where: { comment: data.comment },
  });

  if (existingReview) {
    sendErrResponseByMsg(
      res,
      "Review with same comment already exist",
      HttpStatus.CONFLICT
    );
  }

  const user = await User.findByPk(data.user);

  if (!user) {
    sendErrResponseByMsg(res, "Cannot find user", HttpStatus.NOT_FOUND);
  }

  const savedReview = await Reviews.create(data);
  savedReview.setUser(user);
  // savedReview.dataValues.user = user;

  return savedReview;
}

export async function getSpecifiedReviewsService(id) {
  return Reviews.findByPk(id, { include: [{ model : User }] });
}

export function getAllReviewsService({
  find = {},
  sort = "createdAt",
  limit = "",
  skip = "",
  select = "",
}) {
  const queryOptions = {
    attributes: select,
    where: find,
    include: ["User"],
  };

  // Add sorting order
  if (sort) {
    queryOptions.order = [[sort]];
  }

  // Add limit and offset
  if (limit) {
    queryOptions.limit = parseInt(limit);
  }

  if (skip) {
    queryOptions.offset = parseInt(skip);
  }

  return Reviews.findAll(queryOptions);
}

export async function updateReviewsService({ id, data }) {
  const [_, [updatedReviews]] = await Reviews.update(data, {
    where: { id },
    returning: true,
  });

  return updatedReviews;
}

export async function deleteReviewsService(id) {
    
  const recordToDelete = await Reviews.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Reviews not found" };
  }

  const deletedRows = await Reviews.destroy({
    where: { id },
  });

  return recordToDelete;
}