import { prisma } from "@/prisma/prisma";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const categoryId = query.categoryId;

  if (!categoryId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Category id is required"
    });
  }

  try {
    const products = await prisma.product.findMany({
      where: { categoryId: Number(categoryId) },
      include: {
        translations: true,
        category: true,
        img: true
      }
    });
    return {
      statusCode: 200,
      message: "Products fetched successfully",
      data: products
    };
  } catch (error) {
    console.error("Error fetching products by category", error);
    throw createError({
      statusCode: 500,
      statusMessage: "An error occurred while fetching products"
    });
  }
});
