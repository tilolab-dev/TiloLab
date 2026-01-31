// import { useSupabaseAdmin } from "@/server/utils/supabase";
import { prisma } from "@/prisma/prisma";

async function deleteFile(event: any) {
  const supabase = useSupabaseAdmin();
  // const supabase = useSu;

  const body = await readBody(event);
  const BUCKET = "Images";

  const { itemId, itemUrl, methodType } = body;

  const filePath = decodeURIComponent(itemUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1]);

  if (!filePath) throw new Error("Invalid image url");

  const removeCategory = async () => {
    try {
      await prisma.category.update({
        where: {
          id: itemId
        },
        data: {
          categoryImg: null
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeImg = async () => {
    try {
      await prisma.productImg.delete({
        where: {
          id: itemId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeOption = async () => {
    try {
      await prisma.productOptions.delete({
        where: {
          id: itemId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  try {
    const { data, error } = await supabase.storage.from(BUCKET).remove([filePath]);

    if (error) {
      return {
        success: false,
        message: error.message
      };
    }

    switch (methodType) {
      case "productImg":
        await removeImg();
        break;
      case "optionImg":
        await removeOption();
        break;
      case "categoryImg":
        await removeCategory();
        break;
    }

    return {
      success: true,
      message: "Зображення успішно видалено",
      deletedFile: data?.[0]?.name ?? null
    };
  } catch (err) {
    return {
      success: false,
      message: err
    };
  }
}
export default deleteFile;
