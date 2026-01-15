import { getProductById, deleteProduct, patchProduct } from "@/server/services/productsServices";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  const method = event.node.req.method;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product id is required"
    });
  }

  switch (method) {
    case "GET":
      return getProductById(id);

    case "POST":
      // return await updateUser();
      break;
    case "PATCH":
      return patchProduct(+id, event);
    case "DELETE":
      return deleteProduct(id);
    default:
      throw createError({ statusCode: 400, statusMessage: "Method not defined" });
  }
});
