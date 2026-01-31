import { setCookie } from "h3";

async function logoutAdmin(event: any) {
  setCookie(event, "role", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0
  });

  return {
    statusCode: 200,
    statusMessage: "Logout successful"
  };
}

export default logoutAdmin;
