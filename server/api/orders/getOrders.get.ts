import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  try {
    const resFetchOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
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
