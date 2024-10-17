import { fDate } from "./format-time";

export const formatDateTime = (date: any, placeHolder: string) => {
  if (!date) {
    return placeHolder;
  }

  const formattedDate = fDate(date, "yyyy-MM-dd");

  // const formattedTime = time.toLocaleTimeString("en-US", {
  //   hour: "numeric",
  //   minute: "numeric",
  //   hour12: true,
  // });

  return `${formattedDate}`;
};
