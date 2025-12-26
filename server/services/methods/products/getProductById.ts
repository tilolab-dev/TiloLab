import { prisma } from "@/prisma/prisma";

async function getProductById(event: string) {
  // console.log(typeof event, 'event');

  const productId = parseInt(event);

  try {
    const getProduct = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        img: true,
        options: {
          include: {
            translations: true
          }
        },
        translations: true
      }
    });

    return {
      statusCode: 200,
      message: "Success",
      data: getProduct
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      message: "Server error"
    };
  }
}

export default getProductById;
