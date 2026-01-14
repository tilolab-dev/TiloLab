import {
  deleteCategory,
  getCategoryWithProducts,
  patchCategory
} from "@/server/services/categoryServices";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const method = event.node.req.method;
  const query = getQuery(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product id is required"
    });
  }

  switch (method) {
    case "GET":
      if (query.categoryId) {
        return await getCategoryWithProducts(Number(query.categoryId));
      }
      break;

    case "POST":
      // return await updateUser();
      break;
    case "PATCH":
      return await patchCategory(+id, event);
    case "DELETE":
      return await deleteCategory(+id);
    default:
      throw createError({ statusCode: 400, statusMessage: "Method not defined" });
  }
});
