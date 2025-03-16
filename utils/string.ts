export const snipText = (maxLine: number) => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitLineClamp: maxLine,
  WebkitBoxOrient: 'vertical',
});

export function convertRoute(route: string): string {
  return route.replace(/^\//, ''); // Remove leading slash if present
}

export function getLastSegment(path: string): string {
  const segments = path.split('/').filter((segment) => segment); // Filter out empty segments
  return segments[segments.length - 1];
}

export function packageNameModifier(input: string): string {
  return input.toLowerCase().replace(/\s+/g, '_');
}
