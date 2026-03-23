import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { productId } = body;

  if (!productId) {
    return {
      statusCode: 404,
      message: "Product ID is required",
      data: []
    };
  }

  try {
    const existing = await prisma.popularProduct.findUnique({
      where: { productId }
    });

    let popular;
    if (existing) {
      popular = existing;
    } else {
      popular = await prisma.popularProduct.create({
        data: { productId }
      });
    }

    return {
      statusCode: 200,
      message: "Success",
      data: popular
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
