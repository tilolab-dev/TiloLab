import crypto from "crypto";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event);
  const rawBodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody!);

  const sign = getHeader(event, "x-sign");
  if (!sign) throw createError({ statusCode: 400, message: "No signature" });

  const signatureBuffer = Buffer.from(sign, "base64");

  const publicKey = Buffer.from(process.env.BANK_TEST_PUBLIC_KEY!, "base64");
  if (!publicKey) throw createError({ statusCode: 500, message: "No public key" });

  const isValid = crypto.verify(
    "sha256",
    rawBodyBuffer,
    {
      key: publicKey,
      format: "pem",
      type: "spki"
    },
    signatureBuffer
  );

  // const rawBody = await readRawBody(event);
  // const sign = getHeader(event, "x-sign");
  // const signatureBuffer = Buffer.from(sign!, "base64");

  // const expected = crypto
  //   // .createHmac("sha256", process.env.BANK_API_KEY!)
  //   .createHmac("sha256", process.env.TEST_BANK_API_KEY!)
  //   .update(rawBody!)
  //   .digest("base64");

  // console.log(signature, expected, "signature");

  // if (signature !== expected) {
  //   throw createError({ statusCode: 403 });
  // }

  // const publicKey = process.env.BANK_TEST_PUBLIC_KEY;

  // const isValid = crypto.verify(
  //   "sha256",
  //   rawBody!,
  //   {
  //     key: publicKey,
  //     format: "pem",
  //     type: "spki"
  //   },
  //   signatureBuffer
  // );

  if (!isValid) throw createError({ statusCode: 403, message: "Invalid signature" });

  const data = JSON.parse(rawBody!.toString());

  if (data.status !== "success") {
    console.log("Платіж не пройшов");
    return { ok: true, message: "Платіж не пройшов " };
  }

  const payment = await prisma.payment.findUnique({
    where: { monoInvoice: data.invoiceId },
    include: { order: { include: { orderItems: true } } }
  });

  if (!payment || !payment.order) {
    console.log("Платіж чи замовлення не знайдено");
    throw createError({ statusCode: 404, statusMessage: "Платіж чи замовлення не знайдено" });
  }

  const order = payment.order;
  console.log(order, "order");
  if (order.status !== "NEW") {
    console.log("Замовлення вже оплачено: ", order.status);
    return { ok: true, message: `Замовлення вже оплачено: ${order.status}` };
  }

  await prisma.$transaction(async (tx) => {
    for (const item of order.orderItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stockValue: { decrement: item.quantity },
          stockReserved: { decrement: item.quantity }
        }
      });
    }
    console.log(order, order.id, "order");
    await tx.order.update({
      where: { id: order.id },
      data: { status: "PAID" }
    });

    await tx.payment.update({
      where: { id: payment.id },
      data: { status: "SUCCESS" }
    });

    // IMPLEMENT NOTIFICATION FEATURE
  });

  console.log("Payment was success");

  return { statusCode: 200, message: "Платіж успішно оброблений" };
});
