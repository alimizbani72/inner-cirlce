export const handleLanguageChange = (language: string) => {
  document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 365}`;
  window.location.reload();
};
export const parsedCookies = (cookieHeader: string): Record<string, string> =>
  cookieHeader.split('; ').reduce((acc: any, cookie) => {
    const [name, ...rest] = cookie.split('=');
    acc[name] = rest.join('=');
    return acc;
  }, {});
