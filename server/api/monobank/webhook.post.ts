import crypto from "crypto";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event);
  const signature = getHeader(event, "x-signature");

  const expected = crypto
    .createHmac("sha256", process.env.BANK_API_KEY!)
    .update(rawBody!)
    .digest("base64");

  if (signature !== expected) {
    throw createError({ statusCode: 403 });
  }

  const data = JSON.parse(rawBody!.toString());

  if (data.status !== "success") {
    return { ok: true, message: "Платіж не пройшов " };
  }

  const payment = await prisma.payment.findUnique({
    where: { monoInvoice: data.invoiceId },
    include: { order: { include: { orderItems: true } } }
  });

  if (!payment || !payment.order) {
    throw createError({ statusCode: 404, statusMessage: "Платіж чи замовлення не знайдено" });
  }

  const order = payment.order;

  if (order.status !== "NEW") {
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

  return { statusCode: 200, message: "Платіж успішно оброблений" };
});
