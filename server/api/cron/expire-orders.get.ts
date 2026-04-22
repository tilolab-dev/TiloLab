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
    const result = await prisma.$transaction(async (tx) => {
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

      if (!expiredOrders.length) {
        return { processedOrders: 0 };
      }

      const orderIds = expiredOrders.map((o) => o.id);

      await tx.order.updateMany({
        where: {
          id: { in: orderIds }
        },
        data: {
          status: "EXPIRED"
        }
      });

      const productMap = new Map<number, number>();
      const optionMap = new Map<number, number>();

      for (const order of expiredOrders) {
        for (const item of order.orderItems) {
          if (item.optionId) {
            optionMap.set(item.optionId, (optionMap.get(item.optionId) || 0) + item.quantity);
          } else {
            productMap.set(item.productId, (productMap.get(item.productId) || 0) + item.quantity);
          }
        }
      }

      for (const [optionId, quantity] of optionMap) {
        await tx.productOptions.update({
          where: { id: optionId },
          data: {
            optionReserved: {
              decrement: quantity
            }
          }
        });
      }

      for (const [productId, quantity] of productMap) {
        await tx.product.update({
          where: { id: productId },
          data: {
            stockReserved: {
              decrement: quantity
            }
          }
        });
      }

      return {
        processedOrders: expiredOrders.length,
        productsUpdated: productMap.size,
        optionsUpdated: optionMap.size
      };
    });

    console.log("[CRON] Orders expired:", result);

    return {
      statusCode: 200,
      message: "Orders expired successfully",
      ...result,
      processedAt: now.toISOString()
    };
  } catch (err) {
    console.error("[CRON][EXPIRE_ORDERS]", err);

    throw createError({
      statusCode: 500,
      statusMessage: "Cron failed"
    });
  }
});
