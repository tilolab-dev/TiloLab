import { prisma } from "@/prisma/prisma";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  // return {
  //   statusCode: 500,
  //   message: "The method are not available anymore"
  // };
  try {
    const body = await readBody(event);
    // console.log(body, "body");
    if (!body) {
      return {
        statusCode: 400,
        message: "Missing userId in body"
      };
    }
    const { userId, userName, userFamily, dateOfBirth, phoneNumber } = body as any;
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });
    // console.log(existingUser, "existingUser");
    if (!existingUser) {
      return {
        statusCode: 404,
        message: "User not found"
      };
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: userName ?? existingUser.username,
        userFamily: userFamily ?? existingUser.userFamily,
        dateOfBirth: dateOfBirth ?? existingUser.dateOfBirth,
        phoneNumber: phoneNumber ?? existingUser.phoneNumber
      }
    });
    // console.log(updatedUser, "updateUser");
    return {
      statusCode: 200,
      user: updatedUser
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: "Something went wrong",
      err: err
    };
  }
});
