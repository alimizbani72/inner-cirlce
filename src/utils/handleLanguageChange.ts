export const handleLanguageChange = (
  currentPath: string,
  language: string,
  replace: (
    href: string,
    options?: {
      scroll?: boolean;
    },
    NProgressOptions?:
      | {
          showProgressBar?: boolean;
          startPosition?: number;
          disableSameURL?: boolean;
        }
      | undefined
  ) => void
) => {
  document.cookie = `lang=${language}; path=/; max-age=${60 * 60 * 24 * 365}`;
  const newPath = currentPath.replace(/^\/[a-z]{2}(\/|$)/, `/${language}$1`);
  replace(newPath);
};
