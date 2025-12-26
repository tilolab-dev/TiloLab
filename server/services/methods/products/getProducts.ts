import { prisma } from "@/prisma/prisma";
// import redisClient from "../../../../utils/redisClient";

async function getProducts(event: any) {
  console.log(event);
  // const page = 1;
  // const pageSize = 10;

  // const cacheKey = `all_products_page_${page}_size_${pageSize}`;

  try {
    // const cacheData = await redisClient.get(cacheKey);
    // if (cacheData) {
    //     console.log('Data loaded from cache');
    //     return {
    //         data: JSON.parse(cacheData),
    //         message: 'Data loaded from cache'
    //     };
    // }

    const products = await prisma.product.findMany({
      // skip: (page - 1) * pageSize,
      // take: pageSize,
      include: {
        img: true,
        options: {
          include: {
            translations: true
          }
        },
        translations: true,
        category: true
      }
    });

    // await redisClient.set(cacheKey, JSON.stringify(products), "EX", 3600);

    return {
      data: products,
      message: "Getting data was successful"
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      error: error
    };
  }
}

export default getProducts;
