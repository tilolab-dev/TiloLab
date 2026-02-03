import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);

  console.log(body, "body");

  const items: { productId: number; quantity: number }[] = body.items;

  if (!items || !items.length) {
    return {
      ok: false,
      message: "No items to check"
    };
  }

  console.log(items, "items");

  //   const products = await prisma.product.findMany({
  //     where: {
  //       id: {
  //         in: items.map((i) => i.productId)
  //       }
  //     }
  //     // select: {
  //     //   id: true
  //     //   stock: true,
  //     //   title: true
  //     // }
  //   });

  //   return {
  //     ok: true,
  //     data: products
  //   };

  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: items.map((i) => i.productId)
        }
      },
      select: {
        id: true,
        stockValue: true,
        translations: {
          select: {
            title: true
          }
        }
      }
    });

    const unavailableItems = items
      .map((item) => {
        const product: any = products.find((p) => p.id === item.productId);

        if (!product) {
          return {
            productId: item.productId,
            reason: "PRODUCT_NOT_FOUND"
          };
        }

        if (product.stockValue < item.quantity) {
          return {
            productId: product.id,
            title: product.translations[0].title,
            requested: item.quantity,
            available: product.stockValue
          };
        }

        return null;
      })
      .filter(Boolean);

    if (unavailableItems.length) {
      return {
        statusCode: 400,
        data: unavailableItems,
        message: "Some items are not available"
      };
    }

    return {
      statusCode: 200,
      message: "Success"
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      err: err,
      message: "Something went wrong"
    };
  }
});
