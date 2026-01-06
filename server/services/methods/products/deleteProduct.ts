import { prisma } from "@/prisma/prisma";

async function deleteProduct(event: any) {
  const productId = await readBody<{ productId: number }>(event);

  console.log(productId, "productId");

  if (!productId) {
    return {
      statusCode: 400,
      message: "Product Id is required"
    };
  }
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: productId.productId
      }
    });

    return {
      statusCode: 200,
      message: "Product deleted successfully",
      data: deleteProduct
    };
  } catch (error) {
    console.log(error);
  }
}

export default deleteProduct;
