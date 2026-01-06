import { defineEventHandler } from "h3";
import { addProduct, getProducts } from "@/server/services/productsServices";

export default defineEventHandler((event) => {
  const method = event.node.req.method;

  switch (method) {
    case "GET":
      return getProducts();

    case "POST":
      return addProduct(event);

    default:
      return { message: "Method not defined" };
  }
});
