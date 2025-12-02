import jwt from "jsonwebtoken";
import { prisma } from "@/prisma/prisma";
import { getCookie, setCookie } from "h3";

const JWT_SECRET = process.env.JWT_SECRET as string;

async function me(event: any) {
  let accessToken = getCookie(event, "accessToken");
  const refreshToken = getCookie(event, "refreshToken");

  if (!accessToken && refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: number };
      accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      setCookie(event, "accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600,
      });
    } catch (error) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid refresh token",
      });
    }
  }
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, JWT_SECRET) as { id: number };
  
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          username: true,
          userSurname: true,
          userFamily: true,
          userAvatar: true,
          phoneNumber: true,
          createdAt: true,
          email: true,
          role: true,
          telegramChatId: true,
          telegramRole: true,
          adresses: {
            select: {
              id: true,
              city: true,
              postIndex: true,
              homeAdress: true,
              postCompany: true,
              postOffice: true,
              postomat: true
            },
          },
          notifications: {
            select: {
              id: true,
              isReaded: true,
              message: true,
              createdAt: true,
            },
          },
  
        }
      });
  
      if (!user) {
        throw createError({ statusCode: 401, statusMessage: "User not found" });
      }
  
      console.log("User found:", user);
      return { user: user };
    } catch (error) {
      console.error("Access token invalid:", error);
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid access token",
      });
    }
  }
 
}

export default me;
