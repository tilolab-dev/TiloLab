import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { noteId } = body;

  if (!noteId) {
    return {
      statusCode: 404,
      message: "Notification ID is required",
      data: []
    };
  }
  try {
    const updateStatusRes = await prisma.adminNotification.update({
      where: { id: noteId },
      data: {
        isReaded: true
      }
    });

    console.log(updateStatusRes, "updateStatus");

    if (!updateStatusRes) {
      return {
        statusCode: 400,
        message: `Something went wrong during notification update`,
        data: []
      };
    }

    return {
      statusCode: 200,
      message: "Success",
      data: updateStatusRes
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: `Something went wrong ${err}`,
      data: []
    };
  }
});
