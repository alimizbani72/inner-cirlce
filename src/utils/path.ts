/**
 * Joins a base URL with multiple relative path segments to form a complete URL.
 *
 * @param baseUrl - The base URL.
 * @param paths - An array of path segments to append to the base URL.
 * @returns The combined URL.
 */
export const resolvePathJoin = (baseUrl: string, ...paths: string[]): string => {
  try {
    // Normalize the base URL to ensure it ends with a slash.
    if (!baseUrl.endsWith("/")) {
      // biome-ignore lint/style/noParameterAssign: <explanation>
      baseUrl += "/";
    }

    // Join all paths with slashes, removing any redundant slashes.
    const fullPath = paths.join("/").replace(/\/+/g, "/");

    // Create a new URL object with the full path and base URL.
    const combinedUrl = new URL(fullPath, baseUrl);

    // Return the absolute URL as a string.
    return combinedUrl.href;
  } catch (error) {
    console.error("Invalid URL", error);
    throw new Error("Could not resolve the URL.");
  }
};
