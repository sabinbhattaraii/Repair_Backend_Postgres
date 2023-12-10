import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { User } from "../models/user.js";

export async function createUserService(data, res) {
  const exisitngUser = await User.findOne({ where: { email: data.email } });

  if (exisitngUser) {
    sendErrResponseByMsg(
      res,
      "User with same email exists",
      HttpStatus.CONFLICT
    );
  }

  const savedUser = await User.create(data);

  return savedUser;
}

export async function getSpecifiedUserService({id}){
  return await User.findByPk(id);
}

export async function getMyProfileService({id}){
  return await User.findByPk(id);
}

export function getAllUserService({
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

  return User.findAll(queryOptions);
}

export async function updateSpecifiedUserService({ id, data }) {
  // Update the record and return the updated object
  const [_, [updatedUser]] = await User.update(data, {
    where: { id },
    returning: true, // Get the updated record
  });

  return updatedUser;
}

export async function deleteSpecifiedUserService(id) {
  // Find the record that you're about to delete
  const recordToDelete = await User.findByPk(id);

  if (!recordToDelete) {
    // Record with the provided ID not found
    return { success: false, message: "Record not found" };
  }

  //delete the record
  const deletedRows = await User.destroy({
    where: { id },
  });

  return recordToDelete;
}

export const getSpecificUserByAny = async (email) => {
  try {
    const user = await User.findOne({
      where: { email }, // Searching for a user with a matching email
    });

    return user; // Return the found user (or null if not found)
  } catch (error) {
    // Handle any errors that might occur during the query
    console.error("Error:", error);
    throw error; // Rethrow the error or handle it as needed
  }
};