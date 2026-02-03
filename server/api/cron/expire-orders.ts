import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, "authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }

  const now = new Date();

  try {
    await prisma.$transaction(async (tx) => {
      const expiredOrders = await tx.order.findMany({
        where: {
          status: "NEW",
          expiresAt: {
            lte: now
          }
        },
        include: {
          orderItems: true
        }
      });

      if (expiredOrders.length === 0) {
        return;
      }

      await tx.order.updateMany({
        where: {
          id: {
            in: expiredOrders.map((order) => order.id)
          }
        },
        data: {
          status: "EXPIRED"
        }
      });

      const productMap = new Map<number, number>();

      for (const order of expiredOrders) {
        for (const item of order.orderItems) {
          productMap.set(item.productId, (productMap.get(item.productId) || 0) + item.quantity);
        }
      }

      for (const [productId, quantity] of productMap) {
        await tx.product.update({
          where: { id: productId },
          data: {
            stockReserved: {
              decrement: quantity
            },
            stockValue: {
              increment: quantity
            }
          }
        });
      }
    });

    console.log("Orders expired successfully");
    return {
      statusCode: 200,
      message: "Orders expired successfully",
      proccessed: now.toISOString()
    };
  } catch (err) {
    console.error(`[CRON][EXPIRE_ORDERS]`, err);
    throw createError({
      statusCode: 500,
      statusMessage: "Cron failed"
    });
  }
});
