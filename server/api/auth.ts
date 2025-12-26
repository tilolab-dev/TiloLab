import { defineEventHandler } from "h3";
import {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
  me,
  sendVerifyPass,
  checkVerifyPass
} from "../services/authServices";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const query = getQuery(event);

  console.log(query, "query");

  switch (method) {
    case "GET":
      if (query.auth === "me") {
        return await me(event);
      }
      break;
    case "POST":
      if (query.auth === "login") {
        return await loginUser(event);
      } else if (query.auth === "register") {
        return await createUser(event);
      } else if (query.auth === "refresh") {
        return await refreshToken(event);
      } else if (query.auth === "logout") {
        return await logoutUser(event);
      } else if (query.auth === "sendVerifyPass") {
        return await sendVerifyPass(event);
      } else if (query.auth === "checkVerifyPass") {
        return await checkVerifyPass(event);
      }
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      return { message: "Method not defined" };
  }
});
