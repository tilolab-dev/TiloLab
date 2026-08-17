import crypto from "crypto";
import { prisma } from "@/prisma/prisma";
import { handleCertificateSurchargePayment } from "@/server/services/payment/handleCertificateSurchargePayment";
import { handleRegularPayment } from "@/server/services/payment/handleRegularPayment";

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event);
  const rawBodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(rawBody!);

  const sign = getHeader(event, "x-sign");
  if (!sign) throw createError({ statusCode: 400, message: "No signature" });

  const signatureBuffer = Buffer.from(sign, "base64");

  const publicKey = Buffer.from(process.env.BANK_PUBLIC_KEY!, "base64");
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

  if (!isValid) throw createError({ statusCode: 403, message: "Invalid signature" });

  const data = JSON.parse(rawBody!.toString());

  if (data.status !== "success") {
    return { ok: true, message: "Платіж не пройшов " };
  }

  const payment = await prisma.payment.findUnique({
    where: { monoInvoice: data.invoiceId },
    include: { order: { include: { orderItems: { include: { product: true } } } } }
  });

  if (!payment || !payment.order) {
    throw createError({ statusCode: 404, statusMessage: "Платіж чи замовлення не знайдено" });
  }

  if (payment.type === "CERTIFICATE_SURCHARGE") {
    return await handleCertificateSurchargePayment(payment);
  }

  return await handleRegularPayment(payment);
});
