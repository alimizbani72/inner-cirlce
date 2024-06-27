export const handleLanguageChange = (currentPath: string, language: string) => {
  document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 365}`;
  const newPath = currentPath.replace(/^\/[a-z]{2}(\/|$)/, `/${language}$1`);
  window.location.href = newPath;
};
