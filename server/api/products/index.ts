import { defineEventHandler } from "h3";
import { addProduct, deleteProduct, getProducts } from "@/server/services/productsServices";

export default defineEventHandler((event) => {
  const method = event.node.req.method;
  // const query = getQuery(event);
  //
  // console.log(query, 'query')

  switch (method) {
    case "GET":
      // if (query.product === 'getProductById') {
      //     console.log('enter getProduct')
      //     return;
      //     // return getProductById(event)
      // } else {
      return getProducts();
    // }

    case "POST":
      return addProduct(event);
    case "PATCH":
      // return await updateUser();
      break;
    case "DELETE":
      return deleteProduct(event);
    default:
      return { message: "Method not defined" };
  }
});
