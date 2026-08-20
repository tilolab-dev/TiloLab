import { defineEventHandler } from "h3";
import { ProductTag } from "@/prisma/generated/enums";

export default defineEventHandler(async () => {
  try {
    return {
      tags: Object.values(ProductTag)
    };
  } catch (error) {
    console.log(error);
  }
});
