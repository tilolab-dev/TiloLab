import { prisma } from "@/prisma/prisma";

// interface IProductQuantity {
//   stockValue: number | null;
//   stockReserved: number | null;
// }

async function getProductById(event: string) {
  // console.log(typeof event, 'event');

  const productId = parseInt(event);

  try {
    const getProduct = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        img: true,
        options: {
          include: {
            translations: true
          }
        },
        translations: true
      }
    });

    console.log("product value 1", getProduct?.stockValue);

    // const productsWithAvailable = getProduct?.map?((product: IProductQuantity) => ({
    //   ...product,
    //   availableStock: (product.stockValue || 0) - (product.stockReserved || 0)
    // }));

    const availableProduct = (getProduct?.stockValue || 0) - (getProduct?.stockReserved || 0);

    const updatedProduct = { ...getProduct, availableProduct: availableProduct };
    // getProduct?.stockValue = availableProduct;

    console.log("product value 2", updatedProduct.availableProduct);

    return {
      statusCode: 200,
      message: "Success",
      data: updatedProduct
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      message: "Server error"
    };
  }
}

export default getProductById;
