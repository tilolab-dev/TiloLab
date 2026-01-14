import { prisma } from "@/prisma/prisma";

const patchCategory = async (id: number, event: any) => {
  const body = await readBody(event);

  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: "Invalid id" });
  }

  if (!body) {
    return { statusCode: 400, message: "No data received" };
  }

  try {
    const updateCategory = await prisma.category.update({
      where: { id: +id },
      data: {
        group: body.group,
        visible: body.visible,
        categoryImg: body.categoryImg,

        translations: {
          deleteMany: {},
          create: body.translations
        }
      }
    });

    return {
      statusCode: 200,
      message: "Category updated successfully",
      data: updateCategory
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: `Something went wrong, ${err}`
    };
  }
};

export default patchCategory;
