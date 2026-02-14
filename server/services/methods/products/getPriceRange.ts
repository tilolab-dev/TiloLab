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

    console.log("Aggregate min:", trueMinPrice);
    console.log("Aggregate max:", trueMaxPrice);

    const minPrice = trueMinPrice;
    const maxPrice = trueMaxPrice;

    if (minPrice < 0 || maxPrice < 0) {
      return {
        statusCode: 500,
        message: "Invalid price range"
      };
    }

    // Convert price to number and round min down to nearest 100, max up to nearest 100
    // For minimum: if it's less than 100, round to nearest 10, otherwise use as-is or round to nearest 100
    let roundedMin;
    if (minPrice <= 0) {
      roundedMin = 1; // Handle 0 case
    } else if (minPrice < 100) {
      roundedMin = Math.floor(minPrice / 10) * 10; // Round to nearest 10
    } else {
      roundedMin = Math.floor(minPrice / 100) * 100; // Round to nearest 100 for larger values
    }

    const roundedMax = Math.ceil(maxPrice / 100) * 100;

    return {
      statusCode: 200,
      message: "Success",
      data: {
        min: roundedMin,
        max: roundedMax,
        actualMin: minPrice,
        actualMax: maxPrice
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
