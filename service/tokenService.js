import { HttpStatus } from "../constant/constant.js";
import { sendErrResponseByMsg } from "../middleware/errorMiddleware.js";
import { TokenDatas } from "../models/token.js";

export async function createTokenService(data, res) {
  const exisitngToken = await TokenDatas.findOne({
    where: { token: data.token },
  });

  if (exisitngToken) {
    sendErrResponseByMsg(
      res,
      "TokenData with same token exists",
      HttpStatus.CONFLICT
    );
  }

  const savedToken = await TokenDatas.create(data);

  return savedToken;
}

export async function deleteSpecifiedTokenService(id) {
  try {
    // Find the record that you're about to delete
    const recordToDelete = await TokenDatas.findByPk(id);

    if (!recordToDelete) {
      // Record with the provided ID not found
      return { success: false, message: "Record not found" };
    }

    // Delete the record
    await TokenDatas.destroy({
      where: { id },
    });

    return { success: true, message: "Record deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting record" };
  }
}

export async function deleteAllTokenUser(userId) {
  //delete the record
  const deletedRows = await TokenDatas.destroy({
    where: { userId },
  });

  return deletedRows;
}