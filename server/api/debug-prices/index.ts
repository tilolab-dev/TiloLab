import { prisma } from "@/prisma/prisma";
import { defineEventHandler } from "h3";

const debugPrices = defineEventHandler(async () => {
  try {
    // Get a sample of products to see actual prices
    const products = await prisma.product.findMany({
      take: 10,
      select: {
        id: true,
        productPrice: true
      },
      orderBy: {
        productPrice: "desc"
      }
    });

    // Get min and max properly
    const [minResult, maxResult] = await Promise.all([
      prisma.product.findFirst({
        select: {
          productPrice: true,
          id: true
        },
        orderBy: {
          productPrice: "asc"
        }
      }),
      prisma.product.findFirst({
        select: {
          productPrice: true,
          id: true
        },
        orderBy: {
          productPrice: "desc"
        }
      })
    ]);

    return {
      statusCode: 200,
      message: "Success",
      data: {
        sampleProducts: products,
        minResult,
        maxResult,
        totalProducts: await prisma.product.count()
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: "Something went wrong",
      err: err
    };
  }
});

export default debugPrices;
