// import { readBody } from "h3";
// import supabase from "@/utils/supabase";
import { prisma } from "@/prisma/prisma";

const deleteCategory = async (id: number) => {
  // const body = await readBody(event);

  // console.log(event, "id from delete category");

  try {
    if (!id) {
      throw new Error("category Id is required");
    }

    const deleteCategoryRes = await prisma.category.delete({
      where: { id: id }
    });

    return {
      statusCode: 200,
      message: `Category deleted successfully`,
      data: deleteCategoryRes
    };
  } catch (error) {
    if (error) {
      return {
        statusCode: 400,
        message: error || "Failed to delete category",
        data: null
      };
    }
  }
};

export default deleteCategory;
