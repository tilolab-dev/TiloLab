import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  try {
    const getSendersRes = await prisma.adminMetric.findMany();

    console.log(getSendersRes);

    return {
      statusCode: 200,
      message: "Success",
      data: getSendersRes
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      message: `Something went wrong ${err}`
    };
  }
});
