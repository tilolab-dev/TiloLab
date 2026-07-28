import { prisma } from "@/prisma/prisma";
import { generateCertificateCode } from "./generateCertificateCode";

export const createGiftCertificates = async (orderId: string) => {
  const existingCertificates = await prisma.giftCertificate.count({
    where: {
      orderId
    }
  });

  if (existingCertificates > 0) {
    return [];
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const createdCertificates = [];

  for (const item of order.orderItems) {
    if (!item.product.isCertificate) {
      continue;
    }

    for (let i = 0; i < item.quantity; i++) {
      let code = generateCertificateCode();

      while (
        await prisma.giftCertificate.findUnique({
          where: {
            code
          }
        })
      ) {
        code = generateCertificateCode();
      }

      const certificate = await prisma.giftCertificate.create({
        data: {
          code,
          amount: item.price ?? item.product.productPrice,
          orderId: order.id
        }
      });

      createdCertificates.push(certificate);
    }
  }

  return createdCertificates;
};
