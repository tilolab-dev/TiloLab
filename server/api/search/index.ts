import { defineEventHandler, getQuery } from "h3";
import { searchProducts } from "@/server/services/productsServices";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== "GET") {
    return { message: "Method not allowed" };
  }

  const query = getQuery(event);
  const searchTerm = query.q as string;

  if (!searchTerm || searchTerm.trim().length === 0) {
    return {
      data: [],
      message: "Search term is required"
    };
  }

  try {
    const result = await searchProducts(searchTerm.trim());
    return result;
  } catch (error) {
    return {
      message: "Something went wrong",
      error: error
    };
  }
});
