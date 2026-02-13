import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  try {
    const getNotificationsData = await prisma.adminNotification.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!getNotificationsData) {
      return {
        statusCode: 404,
        message: "Немає повідомлень",
        data: []
      };
    }

    return {
      statusCode: 200,
      message: "Success",
      data: getNotificationsData
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
