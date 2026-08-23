import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async (event) => {
  const { tags } = await readBody(event);

  if (!tags) {
    return {
      statusCode: 404,
      message: "Tags are required"
    };
  }

  const proccessTagsToArr = tags.split(",");
  const tagIds = proccessTagsToArr.map((tag: string) => {
    return tag.trim().toUpperCase();
  });

  try {
    const getTagId = await prisma.tag.findMany({
      where: {
        tagId: {
          in: tagIds
        }
      }
    });

    const getProductsWithTag = await prisma.product.findMany({
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
      },

      where: {
        visible: true,
        stockState: false,

        AND: getTagId.map((tag) => ({
          tags: {
            some: {
              tagId: tag.id
            }
          }
        }))
      }
    });

    return {
      statusCode: 200,
      message: "Success",
      data: getProductsWithTag
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: `Something went wrong ${err}`
    };
  }
});
