import { fDate } from "./format-time";

export const formatDateTime = (date: any, placeHolder: string) => {
  if (!date) {
    return placeHolder;
  }

  const formattedDate = fDate(date,  "MMM d, yyyy");

  return `${formattedDate}`;
};
