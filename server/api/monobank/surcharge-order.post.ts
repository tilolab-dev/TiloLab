import { defineEventHandler, readBody } from "h3";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { orderId, certificateCode } = body;

  if (!orderId || !certificateCode) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
  }

  try {
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

    const certificate = await prisma.giftCertificate.findUnique({
      where: { code: certificateCode }
    });

    if (!certificate) {
      throw createError({ statusCode: 404, statusMessage: "Gift certificate not found" });
    }

    if (certificate.status === "USED") {
      throw createError({ statusCode: 400, statusMessage: "Gift certificate already used" });
    }

    const surchargeAmount = order.totalPrice - certificate.amount;

    if (surchargeAmount <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Surcharge amount is less than or equal to zero"
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

    const invoice: any = await $fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        // PRODUCTION ENVIRONMENT
        // "X-Token": process.env.BANK_API_KEY!

        // TESTING ENVIRONMENT VARIABLE
        "X-Token": process.env.TEST_BANK_API_KEY!
      },
      body: {
        amount: surchargeAmount * 100,
        ccy: 980,
        // PRODUCTION ENVIRONMENT
        // redirectUrl: `https://www.tilolab.com.ua/summary/${orderId}`,
        // webHookUrl: "https://www.tilolab.com.ua/api/monobank/webhook",

        // DEVELOPMENT ENVIRONMENT
        redirectUrl: `https://dev.tilolab.com.ua/summary/${orderId}`,
        webHookUrl: "https://dev.tilolab.com.ua/api/monobank/webhook",

        // TEST ENVIRONMENT
        // redirectUrl: `https://6d11-178-151-189-47.ngrok-free.app/summary/${orderId}`,
        // webHookUrl: "https://6d11-178-151-189-47.ngrok-free.app/api/monobank/webhook",

        validity: 3600,
        merchantPaymInfo: {
          reference: orderId,
          destination: "Оплата замовлення"
        }
      }
    });

    await prisma.payment.upsert({
      where: { orderId },
      update: {
        monoInvoice: invoice.invoiceId,
        amount: surchargeAmount,
        status: "PENDING",
        type: "CERTIFICATE_SURCHARGE",
        certificateId: certificate.id
      },
      create: {
        orderId,
        monoInvoice: invoice.invoiceId,
        amount: surchargeAmount,
        status: "PENDING",
        type: "CERTIFICATE_SURCHARGE",
        certificateId: certificate.id
      }
    });

    await prisma.giftCertificate.update({
      where: { id: certificate.id },
      data: {
        status: "RESERVED",
        reservedAt: new Date()
      }
    });

    return {
      statusCode: 200,
      invoiceId: invoice.invoiceId,
      pageUrl: invoice.pageUrl
    };
  } catch (error) {
    console.error("Error processing surcharge order:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
