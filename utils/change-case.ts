export function paramCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function snakeCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

export function toPascalCase(str: string | undefined): string {
  if (!str) {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/(?:^|\s|[^a-zA-Z0-9]+)(\w)/g, (_, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

export function toTitleCase(str: string): string {
  if (!str) {
    return '';
  }

  // Convert camelCase and PascalCase to space-separated words
  let result = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Convert snake_case and kebab-case to space-separated words
  result = result.replace(/[_-]/g, ' ');

  // Capitalize the first letter of each word and convert the rest to lowercase
  result = result.replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return result;
}
