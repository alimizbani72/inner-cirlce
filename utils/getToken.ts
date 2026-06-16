// import CookieUtils from "@/utils/cookie-utils";

// export const getToken = () => {
//   const accessToken = CookieUtils.getCookie(STORAGE_KEY);
//   return accessToken;
// };
export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("token");
};
