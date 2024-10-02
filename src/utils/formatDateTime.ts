export const formatDateTime = (date: Date | null, time: Date | null, placeHolder: string) => {
  if (!date || !time) {
    return placeHolder;
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};
