import { prisma } from "@/prisma/prisma";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event: any) => {
  const body: any = await readBody(event);

  const { orderId, amount } = body;

  if (!orderId || !amount) {
    throw createError({ statusCode: 400, statusMessage: "Missing orderId or amount" });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: true }
  });

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: "Order not found" });
  }

  if (order.status !== "NEW") {
    throw createError({
      statusCode: 400,
      statusMessage: `Order cannot be paid (current status: ${order.status})`
    });
  }

  if (order.expiresAt && order.expiresAt < new Date()) {
    await prisma.$transaction(async (tx) => {
      for (const item of order.orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stockReserved: { decrement: item.quantity } }
        });
      }
      await tx.order.update({
        where: { id: order.id },
        data: { status: "EXPIRED" }
      });
    });

    throw createError({ statusCode: 400, statusMessage: "Order has expired" });
  }

  try {
    const invoice: any = await $fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        // "X-Token": process.env.BANK_API_KEY!
        "X-Token": process.env.TEST_BANK_API_KEY!
        // TESTING ENVIRONMENT VARIABLE
      },
      body: {
        amount: amount * 100,
        ccy: 980,
        // redirectUrl: `https://edd85ac46640.ngrok-free.app/summary`,
        // webHookUrl: "https://edd85ac46640.ngrok-free.app/api/monobank/webhook",
        redirectUrl: `https://www.tilolab.com.ua/summary/${orderId}`,
        webHookUrl: "https://www.tilolab.com.ua/api/monobank/webhook",

        validity: 3600,
        merchantPaymInfo: {
          reference: orderId,
          destination: "Оплата замовлення"
        }
      }
    });

    await prisma.payment.upsert({
      where: { orderId },
      update: {},
      create: {
        orderId,
        monoInvoice: invoice.invoiceId,
        amount
      }
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: "PAID"
      }
    });

    return {
      invoiceId: invoice.invoiceId,
      pageUrl: invoice.pageUrl
    };
  } catch (err: any) {
    console.error("MONOBANK ERROR:", err);
    return createError({ statusCode: 500, statusMessage: err.message || "MonoBank error" });
  }
});
