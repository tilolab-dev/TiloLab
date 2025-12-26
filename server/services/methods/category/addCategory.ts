// import { readMultipartFormData } from "h3";
// import supabase from "@/utils/supabase";
import { prisma } from "@/prisma/prisma";

type Translation = {
  language: string;
  title: string;
  description: string;
};

async function addCategory(event: any) {
  const body = await readBody<{
    group: string;
    visible: boolean;
    translations: Translation[];
    categoryImg: string;
  }>(event);

  if (!body) {
    return { message: "No data received!" };
  }

  const { group, visible, translations, categoryImg } = body;

  if (!group || !visible || !translations || !categoryImg) {
    return {
      statusCode: 400,
      message: "All fields are required!"
    };
  }

  const lastCategory = await prisma.category.findFirst({
    orderBy: { listPosition: "desc" }
  });

  const newListPosition = lastCategory ? lastCategory.listPosition + 1 : 1;

  try {
    const newCategory = await prisma.category.create({
      data: {
        group: group,
        listPosition: newListPosition,
        visible: visible,
        translations: {
          create: translations.map((translation: any) => ({
            language: translation.language,
            title: translation.title,
            groupText: translation.description,
            description: translation.description
          }))
        },
        categoryImg: categoryImg
      }
    });

    return {
      statusCode: 200,
      tooltipStatus: "success",
      message: "Категорія створена успішно",
      category: newCategory
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      message: `Something went wrong, ${error}`
    };
  }
}

export default addCategory;
