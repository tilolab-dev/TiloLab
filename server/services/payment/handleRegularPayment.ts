import { prisma } from "@/prisma/prisma";
import { createGiftCertificates } from "@/server/services/gift-certificates/createGiftCertificates";
// import { sendTelegramMessage } from "@/server/utils/telegram";
// import { sendSms } from "@/composables/smsNotifications";

export async function handleRegularPayment(payment: any) {
  // найти payment + order + orderItems

  // проверить order.status

  // transaction:
  //   списать товары
  //   Order -> PAID
  //   Payment -> SUCCESS
  //   notification

  // создать сертификаты если есть

  // уведомления о низком остатке

  let isPaymentSuccess = false;

  const order = payment.order;
  if (order.status !== "NEW") {
    return { ok: true, message: `Замовлення вже оплачено: ${order.status}` };
  }

  const orderDetails = await prisma.order.findUnique({
    where: { id: order.id },
    include: { shippingInfo: true }
  });

  let runningOutItems = [] as any[];

  await prisma.$transaction(async (tx) => {
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

    await tx.payment.update({
      where: { id: payment.id },
      data: { status: "SUCCESS" }
    });

    await tx.adminNotification.create({
      data: {
        message: `Нове замовлення на сумму ${order.totalPrice}`,
        isReaded: false
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

  const certificatesInOrder = order.orderItems.filter((item: any) => item.product.isCertificate);

  // const addCertificateCode = async () => {

  //   const createCertificates = () => {

  //     for( let i = 0; i < certificatesInOrder.length; i++) {

  //     }
  //     const getCertificateCode = await createGiftCertificates(order.id);

  //     console.log(getCertificateCode, "getCertificateCodeDATA");

  //     if (!getCertificateCode) {
  //       throw createError({ statusCode: 500, statusMessage: "Error creating gift certificates" });
  //     }

  //     await prisma.giftCertificate.create({
  //       data: {
  //         orderId: order.id,
  //         status: "ACTIVE",
  //         code: getCertificateCode.toString(),
  //         amount: order.totalPrice
  //       }
  //     });
  //   });
  // };

  if (certificatesInOrder.length > 0) {
    console.log("enter creating code");

    // await addCertificateCode();
    await createGiftCertificates(order.id);
  }

  console.log(orderDetails?.orderNumber, "orderDetails?.orderNumber");

  // await sendTelegramMessage(`
  //     🛒 Нове замовлення!

  //     📦 **ID:** ${orderDetails?.orderNumber}

  //     👤 **Отримувач:** ${orderDetails?.shippingInfo?.recipient}
  //     📞 **Телефон:** ${orderDetails?.shippingInfo?.phoneNumber}

  //     💰 **Сума:** ${orderDetails?.totalPrice} грн.

  //     🚚 **Доставка**
  //     🏙️ Місто — ${orderDetails?.shippingInfo?.city}
  //     🏤 Відділення — ${orderDetails?.shippingInfo?.postOffice}
  //     📦 Поштомат — ${orderDetails?.shippingInfo?.postomat}
  //   `);

  // const phoneNumber = orderDetails?.shippingInfo?.phoneNumber;

  // if (phoneNumber) {
  //   try {
  //     await sendSms(phoneNumber, `Ваше замовлення №${orderDetails?.orderNumber} створено.`);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  for (const item of runningOutItems) {
    await prisma.adminNotification.create({
      data: {
        message: `Товар ${item.translations?.[0]?.title || null} залишилось менше ${runningOutItems?.[0]?.actualStock ?? ""} одиниць`
      }
    });
  }

  // console.log(runningOutItems?.translations?.[0]?.title || null, "runningOutItems");
  // console.log(runningOutItems?.[0]?.translations?.[0]?.title || null, "runningOutItems");

  // console.log("Payment was success");

  return {
    statusCode: 200,
    message: "Платіж успішно оброблений"
  };
}
