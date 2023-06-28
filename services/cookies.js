import cookie from "js-cookie";

const cookieConfig = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  expires: 7,
};

export const setCookieData = (key, value) => {
  cookie.set(key, value, cookieConfig);
};

export const getCookieData = (key) => {
  return cookie.get(key);
};

export const removeCookieData = (key) => {
  return cookie.remove(key);
};
