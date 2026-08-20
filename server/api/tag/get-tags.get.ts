import { defineEventHandler } from "h3";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  try {
    const res = await prisma.tagArr.findMany();
    return res;
  } catch (error) {
    console.log(error);
  }
});
