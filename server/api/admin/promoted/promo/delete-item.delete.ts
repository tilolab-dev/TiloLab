import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { productId } = body;

  console.log(productId, "productId");

  if (!productId) {
    return {
      statusCode: 404,
      message: "Product ID is required",
      data: []
    };
  }

  try {
    const deleteItemRes = await prisma.promotedProduct.delete({
      where: { productId }
    });

    return {
      statusCode: 200,
      message: "Success",
      data: deleteItemRes
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
