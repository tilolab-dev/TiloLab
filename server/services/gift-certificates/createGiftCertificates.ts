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

  const certificateItems = order.orderItems.filter((item) => item.product.isCertificate);

  if (!certificateItems.length) {
    return [];
  }

  const createdCertificates = [];

  for (const item of certificateItems) {
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
          orderId: order.id,
          orderItemId: item.id
        }
      });

      createdCertificates.push(certificate);
    }
  }

  console.log(createdCertificates, "createdCertificates");

  return createdCertificates;
};
