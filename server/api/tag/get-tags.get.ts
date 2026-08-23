import { defineEventHandler } from "h3";
import { prisma } from "@/prisma/prisma";

export default defineEventHandler(async () => {
  try {
    const getTags = await prisma.tag.findMany();

    if (!getTags) {
      return {
        statusCode: 500,
        message: "Some issue during fetching data"
      };
    }

    return {
      statusCode: 200,
      message: "Success",
      data: getTags
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      message: "Some issue during getting all tags"
    };
  }
});
