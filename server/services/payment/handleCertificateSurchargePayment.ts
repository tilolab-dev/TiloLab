import { prisma } from "@/prisma/prisma";
// import { sendTelegramMessage } from "@/server/utils/telegram";
// import { sendSms } from "@/composables/smsNotifications";

export async function handleCertificateSurchargePayment(paymentData: any) {
  // console.log(payment, "payment");
  // найти payment
  // найти order
  // найти certificate

  // проверить:
  // payment.status === PENDING
  // order.status === NEW
  // certificate.status === RESERVED

  let isPaymentSuccess = false;

  const order = paymentData.order;
  if (order.status !== "NEW") {
    return { ok: true, message: `Замовлення вже оплачено: ${order.status}` };
  }

  // const orderDetails = await prisma.order.findUnique({
  //   where: { id: order.id },
  //   include: { shippingInfo: true }
  // });

  let runningOutItems = [] as any[];

  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentData.id
    },
    include: {
      order: {
        include: {
          orderItems: {
            include: {
              product: true
            }
          }
        }
      },
      certificate: true
    }
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (!payment.certificate) {
    throw new Error("Certificate not found");
  }

  if (payment.certificate.status !== "RESERVED") {
    throw new Error("Certificate is not reserved");
  }

  await prisma.$transaction(async (tx) => {
    // списать товары
    // RESERVED -> USED
    // usedAt
    // usedOrderId
    // Order -> PAID
    // Payment -> SUCCESS

    // CHARGE PRODUCTS

    for (const item of order.orderItems) {
      if (item.optionId) {
        const updatedOption = await tx.productOptions.update({
          where: { id: item.optionId },
          data: {
            optionStock: { decrement: item.quantity },
            optionReserved: { decrement: item.quantity }
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
        where: { id: item.productId },
        data: {
          stockValue: { decrement: item.quantity },
          stockReserved: { decrement: item.quantity }
        },
        include: {
          translations: true
        }
      });

      const remaining = updatedProduct.stockValue ?? 0;

      if (remaining < 10) {
        runningOutItems.push({
          ...updatedProduct,
          actualStock: remaining
        });
      }
    }

    await tx.order.update({
      where: { id: order.id },
      data: { status: "PAID" }
    });

    // UPDATE CERTIFICATE STATUS

    const result = await tx.giftCertificate.updateMany({
      where: {
        id: payment.certificateId!,
        status: "RESERVED"
      },
      data: {
        status: "USED",
        usedAt: new Date(),
        usedOrderId: payment.orderId
      }
    });

    if (result.count !== 1) {
      throw new Error("Certificate is no longer reserved");
    }

    // UPDATE ORDER STATUS

    await tx.order.update({
      where: {
        id: payment.orderId
      },
      data: {
        status: "PAID"
      }
    });

    // UPDATE PAYMENT STATUS

    await tx.payment.update({
      where: {
        id: payment.id
      },
      data: {
        status: "SUCCESS"
      }
    });

    isPaymentSuccess = true;
  });

  if (!isPaymentSuccess) {
    return {
      statusCode: 400,
      message: "Платіж не оброблений"
    };
  }

  return {
    statusCode: 200,
    message: "Платіж із доплатою успішно оброблений"
  };
}
