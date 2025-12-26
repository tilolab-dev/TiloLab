import jwt from "jsonwebtoken";
import { setCookie, getCookie } from "h3";

async function refreshToken(event: any) {
  const refreshToken = getCookie(event, "refreshToken");
  const JWT_SECRET = process.env.JWT_SECRET as string;

  // if (!refreshToken) {
  //     throw createError({ statusCode: 401, statusMessage: 'Auth is required' });
  // }

  if (refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: number };
      const newAccessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: "1h" });

      setCookie(event, "accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600
      });

      return {
        statusCode: 200,
        statusMessage: "Refresh token successful"
      };
    } catch {
      throw createError({ statusCode: 401, statusMessage: "The token is invalid" });
    }
  }
}
export default refreshToken;
