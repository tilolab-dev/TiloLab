import { prisma } from "@/prisma/prisma";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  const { orderId, amount } = body;

  if (!orderId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing orderId"
    });
  }

  const payment = await prisma.payment.findUnique({
    where: {
      orderId
    },
    include: {
      order: true
    }
  });

  if (!payment || !payment.order) {
    throw createError({
      statusCode: 404,
      statusMessage: "Payment not found"
    });
  }

  if (!payment.monoInvoice) {
    throw createError({
      statusCode: 400,
      statusMessage: "Monobank invoice not found"
    });
  }

  if (payment.order.status !== "PAID") {
    throw createError({
      statusCode: 400,
      statusMessage: `Order cannot be refunded (current status: ${payment.order.status})`
    });
  }

  const refundedAmount = payment.refundedAmount ?? 0;

  const refundAmount = amount ?? payment.amount;

  if (!Number.isFinite(refundAmount) || refundAmount <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid refund amount"
    });
  }

  if (refundAmount > payment.amount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Refund amount exceeds payment amount"
    });
  }

  const availableAmount = payment.amount - refundedAmount;

  if (availableAmount <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payment has already been fully refunded"
    });
  }

  if (refundAmount > availableAmount) {
    throw createError({
      statusCode: 400,
      statusMessage: `Maximum available refund is ${availableAmount}`
    });
  }

  try {
    await $fetch("https://api.monobank.ua/api/merchant/invoice/cancel", {
      method: "POST",
      headers: {
        "X-Token": process.env.BANK_API_KEY!
      },
      body: {
        invoiceId: payment.monoInvoice,

        ...(amount ? { amount: amount * 100 } : {})
      }
    });

    const totalRefunded = refundedAmount + refundAmount;

    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: {
          id: payment.id
        },
        data: {
          refundedAmount: totalRefunded,
          refundedAt: new Date()
        }
      });

      await tx.order.update({
        where: {
          id: payment.order.id
        },
        data: {
          status: totalRefunded >= payment.amount ? "REFUNDED" : "PARTIAL_REFUND"
        }
      });
    });

    return {
      success: true,
      refundedAmount: refundAmount,
      totalRefunded,
      remainingAmount: payment.amount - totalRefunded
    };
  } catch (err: any) {
    console.error("MONOBANK REFUND ERROR:", err);

    throw createError({
      statusCode: 500,
      statusMessage: err?.message || "Monobank refund error"
    });
  }
});
