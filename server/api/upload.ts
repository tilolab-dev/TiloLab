import { defineEventHandler } from "h3";
import { uploadFiles } from "../services/uploadServices";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  switch (method) {
    case "GET":
      break;
    case "POST":
      return uploadFiles(event);
    case "PATCH":
      // return await updateUser();
      break;
    case "DELETE":
      // return await deleteCategory(event)
      // return await deleteUser();
      break;
    default:
      return { message: "Method not defined" };
  }
});
