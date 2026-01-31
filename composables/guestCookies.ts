import { useCookie } from "nuxt/app";

export const getGuestIdFromCookie = () => {
  const cookie = useCookie("guestId");
  return cookie.value ? Number(cookie.value) : null;
};

export const setGuestIdCookie = (id: number) => {
  const cookie = useCookie("guestId", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  cookie.value = String(id);
};

export const clearGuestIdCookie = () => {
  const cookie = useCookie("guestId", { path: "/" });
  cookie.value = null;
};
