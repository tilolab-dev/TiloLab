// REMOVE MEDIA FILES FROM SUPABASE

// import { prisma } from "@/prisma/prisma";
// import supabase from "@/utils/supabase";

// async function deleteFile(event: any) {

//   const body = await readBody(event);
//   const BUCKET = "Images";

//   const { itemId, itemUrl, methodType } = body;

//   const filePath = decodeURIComponent(itemUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1]);

//   if (!filePath) throw new Error("Invalid image url");

//   const removeCategory = async () => {
//     try {
//       await prisma.category.update({
//         where: {
//           id: itemId
//         },
//         data: {
//           categoryImg: null
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const removeImg = async () => {
//     try {
//       await prisma.productImg.delete({
//         where: {
//           id: itemId
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const removeOption = async () => {
//     try {
//       await prisma.productOptions.delete({
//         where: {
//           id: itemId
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   try {
//     const { data, error } = await supabase.storage.from(BUCKET).remove([filePath]);

//     if (error) {
//       return {
//         success: false,
//         message: error.message
//       };
//     }

//     switch (methodType) {
//       case "productImg":
//         await removeImg();
//         break;
//       case "optionImg":
//         await removeOption();
//         break;
//       case "categoryImg":
//         await removeCategory();
//         break;
//     }

//     return {
//       success: true,
//       message: "Зображення успішно видалено",
//       deletedFile: data?.[0]?.name ?? null
//     };
//   } catch (err) {
//     return {
//       success: false,
//       message: err
//     };
//   }
// }
// export default deleteFile;

// REMOVE MEDIA FILES FROM CLOUDFLARE

import { prisma } from "@/prisma/prisma";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { readBody } from "h3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_ACCESS_KEY!,
    secretAccessKey: process.env.CF_SECRET_KEY!
  }
});

async function deleteFile(event: any) {
  const body = await readBody(event);

  const { itemId, itemUrl, methodType } = body;

  const baseUrl = process.env.R2_PUBLIC_URL!;
  const filePath = decodeURIComponent(itemUrl.replace(`${baseUrl}/`, ""));

  if (!filePath) throw new Error("Invalid image url");

  const removeCategory = async () => {
    await prisma.category.update({
      where: { id: itemId },
      data: { categoryImg: null }
    });
  };

  const removeImg = async () => {
    await prisma.productImg.delete({
      where: { id: itemId }
    });
  };

  const removeOption = async () => {
    await prisma.productOptions.delete({
      where: { id: itemId }
    });
  };

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: filePath
      })
    );

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
      deletedFile: filePath
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Error deleting file",
      error: err
    };
  }
}

export default deleteFile;
