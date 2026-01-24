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

  if (data.status === "success") {
    await prisma.payment.update({
      where: { monoInvoice: data.invoiceId },
      data: { status: "SUCCESS" }
    });

    await prisma.order.update({
      where: { id: data.reference },
      data: { status: "SHIPPED" }
    });
  }

  return { ok: true };
});
