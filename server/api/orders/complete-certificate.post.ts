import { defineEventHandler, readBody, createError } from "h3";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const { orderId, certificateCode } = await readBody(event);

  if (!orderId || !certificateCode) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields"
    });
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        orderItems: true
      }
    });

    if (!order) {
      throw createError({
        statusCode: 404,
        statusMessage: "Order not found"
      });
    }

    if (order.status !== "NEW") {
      return {
        statusCode: 400,
        message: `Замовлення вже оплачено: ${order.status}`
      };
    }

    const certificate = await prisma.giftCertificate.findUnique({
      where: {
        code: certificateCode
      }
    });

    if (!certificate) {
      throw createError({
        statusCode: 400,
        statusMessage: "Certificate not found"
      });
    }

    if (certificate.status !== "ACTIVE") {
      throw createError({
        statusCode: 400,
        statusMessage: "Certificate is not active"
      });
    }

    if (certificate.amount < order.totalPrice) {
      throw createError({
        statusCode: 400,
        statusMessage: "Certificate amount is not enough"
      });
    }

    const runningOutItems: any[] = [];

    await prisma.$transaction(async (tx) => {
      const usedCertificate = await tx.giftCertificate.updateMany({
        where: {
          code: certificateCode,
          status: "ACTIVE"
        },
        data: {
          status: "USED",
          usedAt: new Date(),
          usedOrderId: order.id
        }
      });

      if (usedCertificate.count !== 1) {
        throw createError({
          statusCode: 400,
          statusMessage: "Certificate has already been used"
        });
      }

      for (const item of order.orderItems) {
        if (item.optionId) {
          const updatedOption = await tx.productOptions.update({
            where: {
              id: item.optionId
            },
            data: {
              optionStock: {
                decrement: item.quantity
              },
              optionReserved: {
                decrement: item.quantity
              }
            },
            include: {
              Product: {
                include: {
                  translations: true
                }
              }
            }
          });

          const remaining = updatedOption.optionStock ?? 0;

          if (remaining < 10) {
            runningOutItems.push({
              ...updatedOption,
              title: updatedOption.Product?.translations?.[0]?.title,
              actualStock: remaining
            });
          }

          continue;
        }

        const updatedProduct = await tx.product.update({
          where: {
            id: item.productId
          },
          data: {
            stockValue: {
              decrement: item.quantity
            },
            stockReserved: {
              decrement: item.quantity
            }
          },
          include: {
            translations: true
          }
        });

        const remaining = updatedProduct.stockValue ?? 0;

        if (remaining < 10) {
          runningOutItems.push({
            ...updatedProduct,
            title: updatedProduct.translations?.[0]?.title,
            actualStock: remaining
          });
        }
      }

      await tx.order.update({
        where: {
          id: order.id
        },
        data: {
          status: "PAID"
        }
      });

      await tx.adminNotification.create({
        data: {
          message: `Нове замовлення на сумму ${order.totalPrice}. Оплата сертифікатом ${certificateCode}`,
          isReaded: false,
          type: "SUCCESS"
        }
      });
    });

    for (const item of runningOutItems) {
      await prisma.adminNotification.create({
        data: {
          message: `Товар ${
            item.title || "невідомий товар"
          } залишилось менше 10 одиниць. Залишок: ${item.actualStock}`,
          isReaded: false,
          type: "WARNING"
        }
      });
    }

    return {
      statusCode: 200,
      message: "Замовлення успішно оплачено сертифікатом",
      certificate: {
        code: certificate.code,
        amount: certificate.amount,
        status: "USED"
      },
      order: {
        id: order.id,
        status: "PAID"
      }
    };
  } catch (error: any) {
    console.error("Error completing certificate order:", error);

    if (error?.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});
