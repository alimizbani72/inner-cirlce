export const snipText = (maxLine: number) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitLineClamp: maxLine,
  WebkitBoxOrient: "vertical",
});
