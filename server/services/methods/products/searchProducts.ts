import { prisma } from "@/prisma/prisma";

async function searchProducts(searchTerm: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        translations: {
          some: {
            title: {
              contains: searchTerm,
              mode: "insensitive"
            }
          }
        }
      },
      include: {
        img: true,
        options: {
          include: {
            translations: true
          }
        },
        translations: true,
        category: {
          include: {
            translations: true
          }
        }
      }
    });

    return {
      data: products,
      message: "Search completed successfully"
    };
  } catch (error) {
    return {
      message: "Something went wrong during search",
      error: error
    };
  }
}

export default searchProducts;
