export function paramCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function snakeCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export function toPascalCase(str: string | undefined): string {
  if (!str) {
    return "";
  }

  return str
    .toLowerCase()
    .replace(/(?:^|\s|[^a-zA-Z0-9]+)(\w)/g, (_, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
}
