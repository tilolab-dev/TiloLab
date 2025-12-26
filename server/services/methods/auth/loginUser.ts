import { readMultipartFormData } from "h3";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookie } from "h3";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function loginUser(event: any) {
  const data = await readMultipartFormData(event);

  if (!data) {
    return { message: "No data received!" };
  }

  const parsedData = data.map((item) => JSON.parse(item.data.toString()));

  const loginData = parsedData[0];

  const userEmail = loginData.mail;
  const userPassword = loginData.password;

  console.log(userEmail, "userEmail", userPassword, "userPassword");

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    console.log(user, "user");

    if (!user || !user.password) {
      throw createError({ statusCode: 400, statusMessage: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(userPassword, user.password);

    if (!isValidPassword) {
      throw createError({ statusCode: 400, statusMessage: "Invalid login credentials" });
    }

    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    setCookie(event, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600
    });

    setCookie(event, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600 * 24 * 7
    });

    return {
      statusCode: 200,
      statusMessage: "Login successful",
      user: user
    };
  } catch (err) {
    return {
      statusCode: 400,
      statusMessage: "User not found",
      err
    };
  }
}

export default loginUser;
