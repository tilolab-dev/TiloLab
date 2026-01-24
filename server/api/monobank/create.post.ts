import { prisma } from "@/prisma/prisma";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event: any) => {
  const body: any = await readBody(event);

  console.log(process.env.BANK_API_KEY, "env");

  const { orderId, amount } = body;
  console.log(orderId, "orderId");
  console.log(amount, "amount");

  try {
    const invoice: any = await $fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "X-Token": process.env.BANK_API_KEY!
      },
      body: {
        amount: amount * 100,
        ccy: 980,
        redirectUrl: `https://edd85ac46640.ngrok-free.app/summary`,
        webHookUrl: "https://edd85ac46640.ngrok-free.app/api/monobank/webhook",

        validity: 3600,
        merchantPaymInfo: {
          reference: orderId,
          destination: "Оплата заказа"
        }
      }
    });

    // await prisma.payment.upsert({
    //   where: { orderId },
    //   update: {},
    //   create: {
    //     orderId,
    //     monoInvoice: invoice.invoiceId,
    //     amount
    //   }
    // });
    await prisma.payment.upsert({
      where: { orderId },
      update: {},
      create: {
        orderId,
        monoInvoice: invoice.invoiceId,
        amount
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
