import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  console.log("enter");
  try {
    const resFetchOrders = await prisma.order.findMany({
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

    console.log(resFetchOrders, "resFetchOrders");

    return {
      statusCode: 200,
      data: resFetchOrders
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: "Error fetching orders"
    };
  }
});
