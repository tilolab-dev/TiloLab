import { defineEventHandler } from "h3";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const { username, password, rememberMe } = body;

  try {
    if (username.trim() !== config.admin_user_name.trim()) {
      return {
        statusCode: 403,
        message: "Перевірте дані авторизації"
      };
    }

    const validPassword = await bcrypt.compare(password, config.admin_password);

    if (!validPassword) {
      return {
        statusCode: 403,
        message: "Перевірте дані авторизації"
      };
    }

    const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60;

    const token = jwt.sign({ role: "admin" }, config.jwt_secret as string, {
      expiresIn: rememberMe ? "7d" : "1h"
    });

    setCookie(event, "role", "admin", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: maxAge
    });

    return {
      statusCode: 200,
      message: "Login successful",
      token
    };
  } catch (err) {
    return {
      statusCode: 500,
      message: "Some went wrong",
      errMessage: err
    };
  }
});
