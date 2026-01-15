import { defineEventHandler } from "h3";
import { addProduct, getProducts, getProductsByPage } from "@/server/services/productsServices";

export default defineEventHandler((event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  switch (method) {
    case "GET":
      // return getProducts();

      switch (query.getMethod) {
        case "all":
          return getProducts();
        case "page":
          return getProductsByPage(event);
        default:
          return { message: "Method not defined" };
      }

    case "POST":
      return addProduct(event);

    default:
      return { message: "Method not defined" };
  }
});
