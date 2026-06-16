// import CookieUtils from '@/utils/cookie-utils';
// import { STORAGE_KEY } from './constant';

// // ----------------------------------------------------------------------

// export async function setAuthCookie(accessToken: string | null) {
//   try {
//     if (accessToken) {
//       // Store token and create session
//       CookieUtils.setSecureToken(STORAGE_KEY, accessToken, 14);

//       // Set authorization header
//       // AXIOS_INSTANCE.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//     } else {
//       // Clear cookies
//       CookieUtils.removeCookie(STORAGE_KEY);

//       // Clear headers
//       // delete AXIOS_INSTANCE.defaults.headers.common.Authorization;

//       if (typeof window !== 'undefined') {
//         window.location.href = '/login';
//       }
//     }
//   } catch (error) {
//     console.error('Error during set session:', error);
//     CookieUtils.removeCookie(STORAGE_KEY);
//     throw error;
//   }
// }
