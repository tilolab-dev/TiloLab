import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { orderId } = await readBody(event);

    if (!orderId) {
      return {
        statusCode: 400,
        message: "Missing order Id"
      };
    }

    const res = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                img: true,
                category: true,
                translations: true
              }
            }
          }
        },
        shippingInfo: true
      }
    });

    if (!res) {
      return {
        statusCode: 404,
        message: "Recieved order Id not found"
      };
    }

    return {
      statusCode: 200,
      message: "Success",
      data: res
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      message: "Something went wrong"
    };
  }
});
