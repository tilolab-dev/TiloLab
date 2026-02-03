import { prisma } from "@/prisma/prisma";
import { defineEventHandler, getQuery } from "h3";

interface IProductQuantity {
  stockValue: number | null;
  stockReserved: number | null;
}

const getProductsByPage = defineEventHandler(async (event) => {
  const { page, limit, category } = getQuery(event);
  // const where: any = category ? { category } : {};

  const where: any = {};
  if (category) {
    where.categoryId = Number(category);
  }
  try {
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            include: {
              translations: true
            }
          },
          translations: true,
          img: true
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit)
      }),
      prisma.product.count({ where })
    ]);

    const productsWithAvailable = items.map((product: IProductQuantity) => ({
      ...product,
      availableStock: (product.stockValue || 0) - (product.stockReserved || 0)
    }));

    return {
      statusCode: 200,
      message: "Success",
      data: productsWithAvailable,
      productTotal: total
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: "Something went wrong",
      err: err
    };
  }
});

export default getProductsByPage;
