import { prisma } from "@/prisma/prisma";
import { defineEventHandler, getQuery } from "h3";

const getPriceRange = defineEventHandler(async (event) => {
  const { category } = getQuery(event);

  const where: Record<string, any> = {
    visible: true, // Only get visible products
    stockState: true // Only get in-stock products
  };

  if (category) {
    where.categoryId = Number(category);
  }

  try {
    // Get true min and max across ALL products using aggregate queries
    const [minAggregate, maxAggregate] = await Promise.all([
      prisma.product.aggregate({
        where,
        _min: {
          productPrice: true
        }
      }),
      prisma.product.aggregate({
        where,
        _max: {
          productPrice: true
        }
      })
    ]);

    const trueMinPrice = minAggregate._min?.productPrice ?? 0;
    const trueMaxPrice = maxAggregate._max?.productPrice ?? 0;

    // Round min down and max up to nearest reasonable values
    let minPrice = Math.floor(trueMinPrice / 10) * 10; // Round down to nearest 10
    let maxPrice = Math.ceil(trueMaxPrice / 100) * 100; // Round up to nearest 100

    // Special case: if min and max are the same, adjust them
    if (minPrice === maxPrice) {
      minPrice = Math.max(1, minPrice - 100); // Ensure min is at least 1
      maxPrice = maxPrice + 100; // Ensure max is different from min
    }

    // Ensure min is always less than max
    if (minPrice >= maxPrice) {
      minPrice = Math.max(1, maxPrice - 100);
      maxPrice = maxPrice + 100;
    }

    if (minPrice < 0 || maxPrice < 0) {
      return {
        statusCode: 500,
        message: "Invalid price range"
      };
    }

    return {
      statusCode: 200,
      message: "Success",
      data: {
        min: minPrice,
        max: maxPrice,
        actualMin: trueMinPrice,
        actualMax: trueMaxPrice
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

export default getPriceRange;
