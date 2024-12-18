export const snipText = (maxLine: number) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitLineClamp: maxLine,
  WebkitBoxOrient: "vertical",
});

export function convertRoute(route: string): string {
  const parts = route.split("/").filter((part) => part !== "");

  const languageIndex = parts.findIndex((part) => /^[a-z]{2}$/.test(part));
  if (languageIndex !== -1) {
    return parts.slice(languageIndex + 1).join("/");
  }
  return route;
}

export function getLastSegment(path: string): string {
  const segments = path.split("/").filter((segment) => segment); // Filter out empty segments
  return segments[segments.length - 1];
}

export function packageNameModifier(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "_");
}
