import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  try {
    const res = await prisma.user.findMany({
      include: {
        orders: true
      }
    });

    if (!res) {
      return {
        statusCode: 400,
        message: "Some issue during getting all users"
      };
    }

    return {
      statusCode: 200,
      message: "Getting user was successfully",
      data: res
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: "Something went wrong"
    };
  }
});
