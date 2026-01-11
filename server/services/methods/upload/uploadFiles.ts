import { readMultipartFormData } from "h3";
// import { data } from "autoprefixer";
import supabase from "../../../../utils/supabase";

async function uploadFiles(event: any) {
  try {
    const files = await readMultipartFormData(event);

    if (!files || files.length === 0) {
      return { message: "No files upload" };
    }

    // console.log(files);

    const uploadFiles = files.map(async (item, index) => {
      console.log(index);
      const folderName = item.name;
      const file = {
        name: item.filename,
        type: item.type,
        data: item.data
      };

      if (!folderName || !file) {
        throw new Error("Invalid file or folder name");
      }

      const fileBuffer = new Uint8Array(file.data);
      const blob = new Blob([fileBuffer], { type: file.type });

      const { data, error } = await supabase.storage
        .from("Images")
        .upload(`${folderName}/${file.name}`, blob, {
          contentType: file.type,
          upsert: true
        });

      // console.log(data);

      if (error) {
        throw new Error(`Fail to upload file: ${error.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("Images")
        .getPublicUrl(`${folderName}/${file.name}`);
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Failed to retrieve public URL");
      }

      return {
        filePath: publicUrlData.publicUrl,
        message: "File uploaded successfully",
        dataFile: data
      };
    });

    const results = await Promise.all(uploadFiles);

    return {
      success: true,
      data: results
    };
  } catch (error) {
    console.error("Error handling files:", error);
    return { message: "Error processing files", error: error };
  }
}

export default uploadFiles;
