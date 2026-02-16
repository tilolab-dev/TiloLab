import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  try {
    const getListRes = await prisma.popularProduct.findMany({
      include: {
        product: {
          include: {
            img: true,
            translations: true
          }
        }
      }
    });

    if (!getListRes) {
      return {
        statusCode: 400,
        message: "Something went wtong during getting list",
        data: []
      };
    }

    return {
      statusCode: 200,
      message: "Success",
      data: getListRes
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      message: `Something went wrong ${err}`,
      data: []
    };
  }
});
