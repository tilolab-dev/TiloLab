import { prisma } from "@/prisma/prisma";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const { userId, userName, userSurname, dateOfBirth } = await readBody(event);

  if (!userId || userId.length < 1) {
    return {
      statusCode: 400,
      message: "User ID is empty"
    };
  }

  try {
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName: `${userName} ${userSurname}`,
        username: userName,
        userSurname: userSurname,
        dateOfBirth: dateOfBirth
      }
    });

    console.log(updateUser, "updateUser");

    return {
      statusCode: 200,
      message: "User updated successfully",
      data: updateUser
    };
  } catch (e) {
    console.log("Error during update user", e);
    return {
      statusCode: 500,
      message: `Error during update user: ${e}`
    };
  }
});
