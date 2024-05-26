import { useAppRouter } from "@/routes/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PushOptions {
  backURL?: boolean;
  [key: string]: string | boolean | undefined;
}

const useCustomRouter = () => {
  const router = useAppRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const push = useCallback(
    (path: string, options: PushOptions = {}) => {
      // Convert current search params to an object
      const currentQueryParams: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        currentQueryParams[key] = value;
      });

      // If backURL is true, add the current path (excluding locale prefix) as backURL
      if (options.backURL) {
        const localePrefix = pathName.split("/")[1];
        const normalizedPath = pathName.replace(`/${localePrefix}`, "");
        currentQueryParams.backURL = normalizedPath;
      }

      // Combine current query params with any additional params provided in options
      const newQueryParams: Record<string, string> = { ...currentQueryParams };
      Object.entries(options).forEach(([key, value]) => {
        if (typeof value === "string") {
          newQueryParams[key] = value;
        }
      });

      const queryString = new URLSearchParams(newQueryParams).toString();
      const newPath = `${path}?${queryString}`;
      router.push(newPath);
    },
    [router, pathName, searchParams]
  );

  const back = useCallback(() => {
    if (searchParams.has("backURL")) {
      router.push(searchParams.get("backURL")!);
    } else {
      router.push("/dashboard");
    }
  }, [router, searchParams]);

  return { push, back };
};

export default useCustomRouter;
