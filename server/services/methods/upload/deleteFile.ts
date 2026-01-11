import { useSupabaseAdmin } from "@/server/utils/supabase";
import { prisma } from "@/prisma/prisma";

async function deleteFile(event: any) {
  const supabase = useSupabaseAdmin();
  const body = await readBody(event);
  const BUCKET = "Images";

  const { data: fileData, type: methodType } = body;
  const url = methodType === "productImg" ? fileData.path : fileData.optionImg;

  //   console.log(url, methodType);

  // console.log(BUCKET, "BUCKET", url, "url", fileData, "fileData", methodType, "methodType");

  const filePath = decodeURIComponent(url.split(`/storage/v1/object/public/${BUCKET}/`)[1]);

  if (!filePath) throw new Error("Invalid image url");

  //   const folderPath = filePath.split("/").slice(0, -1).join("/");

  const removeImg = async () => {
    const id = fileData.id;

    try {
      await prisma.productImg.delete({
        where: {
          id: +id
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeOption = async () => {
    const id = fileData.id;

    try {
      await prisma.productOptions.delete({
        where: {
          id: id
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

    methodType === "productImg" ? await removeImg() : await removeOption();

    return {
      success: true,
      message: methodType === "productImg" ? "Зображення успішно видалено" : "Опцію видалено",
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
