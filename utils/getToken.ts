import { STORAGE_KEY } from '@/auth';
import CookieUtils from '@/utils/cookie-utils';

export const getToken = () => {
  const accessToken = CookieUtils.getCookie(STORAGE_KEY);
  return accessToken;
};
