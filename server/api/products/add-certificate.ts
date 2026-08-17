import { prisma } from "@/prisma/prisma";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const { name, description, amount, visible, stock } = await readBody(event);

  if (!name || !description || !amount) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
  }

  try {
    const getCertificateGroupId = await prisma.category.findFirst({
      where: { translations: { some: { title: "Подарункові сертифікати" } } }
    });

    console.log(getCertificateGroupId, "getCertificateGroupId");

    if (!getCertificateGroupId) {
      throw createError({ statusCode: 404, statusMessage: "Certificate category not found" });
    }

    const res = await prisma.product.create({
      data: {
        visible,
        stockState: true,
        categoryId: getCertificateGroupId.id,
        discountPercent: 0,
        productPrice: amount,
        stockReserved: 0,
        stockValue: stock ?? 0,
        isCertificate: true,
        translations: {
          create: [
            {
              language: "ua",
              title: name,
              productDescription: description
            }
          ]
        }
      }
    });

    if (!res) {
      throw createError({ statusCode: 500, statusMessage: "Failed to create certificate" });
    }

    return {
      statusCode: 200,
      statusMessage: "Certificate added successfully",
      data: res
    };
  } catch (error) {
    console.error("Error adding certificate:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
