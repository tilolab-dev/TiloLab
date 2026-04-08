// SUPABASE UPLOAD

// import { readMultipartFormData } from "h3";
// import supabase from "@/utils/supabase";

// async function uploadFiles(event: any) {
//   // const supabase = useSupabaseClient();
//   try {
//     const files = await readMultipartFormData(event);

//     if (!files || files.length === 0) {
//       return { message: "No files upload" };
//     }

//     const uploadFiles = files.map(async (item, index) => {
//       console.log(index);
//       const folderName = item.name;
//       const file = {
//         name: item.filename,
//         type: item.type,
//         data: item.data
//       };

//       if (!folderName || !file) {
//         throw new Error("Invalid file or folder name");
//       }

//       const fileBuffer = new Uint8Array(file.data);
//       const blob = new Blob([fileBuffer], { type: file.type });

//       const { data, error } = await supabase.storage
//         .from("Images")
//         .upload(`${folderName}/${file.name}`, blob, {
//           contentType: file.type,
//           upsert: true
//         });

//       if (error) {
//         throw new Error(`Fail to upload file: ${error.message}`);
//       }

//       const { data: publicUrlData } = supabase.storage
//         .from("Images")
//         .getPublicUrl(`${folderName}/${file.name}`);
//       if (!publicUrlData || !publicUrlData.publicUrl) {
//         throw new Error("Failed to retrieve public URL");
//       }

//       return {
//         filePath: publicUrlData.publicUrl,
//         message: "File uploaded successfully",
//         dataFile: data
//       };
//     });

//     const results = await Promise.all(uploadFiles);

//     return {
//       success: true,
//       data: results
//     };
//   } catch (error) {
//     console.error("Error handling files:", error);
//     return { message: "Error processing files", error: error };
//   }
// }

// export default uploadFiles;

// CLAUDFLARE UPLOAD

import { readMultipartFormData } from "h3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_ACCESS_KEY!,
    secretAccessKey: process.env.CF_SECRET_KEY!
  }
});

export default async function uploadFiles(event: any) {
  try {
    const files = await readMultipartFormData(event);

    if (!files || files.length === 0) {
      return { message: "No files upload" };
    }

    const uploadFiles = files.map(async (item) => {
      const folderName = item.name;
      const fileName = item.filename;

      if (!folderName || !fileName) {
        throw new Error("Invalid file or folder name");
      }

      const baseName = fileName.split(".")[0];
      const uniqueName = `${Date.now()}-${baseName}.webp`;

      const key = `${folderName}/${uniqueName}`;

      const compressedImage = await sharp(item.data)
        .resize({
          width: 1200,
          withoutEnlargement: true
        })
        .webp({
          quality: 75
        })
        .toBuffer();

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: key,
          Body: compressedImage,
          ContentType: "image/webp"
        })
      );

      const fileUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

      return {
        filePath: fileUrl,
        message: "File uploaded successfully"
      };
    });

    const results = await Promise.all(uploadFiles);

    return {
      success: true,
      data: results
    };
  } catch (error) {
    console.error("Error handling files:", error);
    return { message: "Error processing files", error };
  }
}
