import Cookies from 'js-cookie';

export const handleLanguageChange = (language: string) => {
  Cookies.set('lang', language, { expires: 365 });
  window.location.reload();
};

export const parsedCookies = (cookieHeader: string): Record<string, string> =>
  !cookieHeader
    ? {}
    : cookieHeader.split('; ').reduce((acc: Record<string, string>, cookie) => {
        const [name, ...rest] = cookie.split('=');
        const value = rest.join('=');
        // Only add if we have both name and value
        if (name && value) {
          acc[name] = value;
        }
        return acc;
      }, {});
