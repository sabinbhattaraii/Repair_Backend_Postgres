import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { Testimonial } from "../models/testimonial.js";

export async function createTestimonialService(data, res) {
    
  const existingTestimonial = await Testimonial.findOne({
    where: { description: data.description },
  });

  if (existingTestimonial) {
    sendErrResponseByMsg(
      res,
      "Testimonial with same description already exists",
      HttpStatus.CONFLICT
    );
  }

  const savedTestimonial = await Testimonial.create(data);

  return savedTestimonial;
}

export async function getSpecifiedTestimonialService(id) {
  return Testimonial.findByPk(id);
}

export function getAllTestimonialService({
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

  return Testimonial.findAll(queryOptions);
}

export async function updateTestimonialService({ id, data }) {
  const [_, [updatedTestimonial]] = await Testimonial.update(data, {
    where: { id },
    returning: true,
  });

  return updatedTestimonial;
}

export async function deleteTestimonialService(id) {

  const recordToDelete = await Testimonial.findByPk(id);

  if (!recordToDelete) {
    return { success: false, message: "Testimonial not found" };
  }

  const deletedRows = await Testimonial.destroy({
    where: { id },
  });

  return recordToDelete;
}