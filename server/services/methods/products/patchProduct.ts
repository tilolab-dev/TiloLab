import { readMultipartFormData } from "h3";
// import supabase from "@/utils/supabase";
// import { prisma } from "@/prisma/prisma";

async function patchProduct(event: any) {
  console.log(event);
  try {
    const body = await readMultipartFormData(event);
    console.log(body);
  } catch (error) {
    console.log(error);
  }
}

export default patchProduct;
