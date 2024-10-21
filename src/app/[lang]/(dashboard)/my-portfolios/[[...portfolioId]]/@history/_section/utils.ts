import { format } from "date-fns";
import { toNumber } from "lodash";

const formatDate = (date: string) => {
  return format(date, 'MMM d');
};

export const transformDataForChart = (data: any[] | undefined) => {
 
  const transformedData = data?.map((item) => ({
    date: item.date,
    investment: toNumber(item.investment),
  }));

  const last7Data = transformedData?.slice(-7);
  if (!last7Data?.length) {
    return null;
  }
  return {
    series: [
      {
        // name: "All",
        categories: last7Data.map((item) => formatDate(item.date)), 
        data: [{ data: last7Data.map((item) => item.investment) }],
      },
      // {
      //   name: "Week",
      //   categories: last12Data.map((item) => formatDate(item.date, "week")),
      //   data: [{ data: last12Data.map((item) => item.investment) }],
      // },
      // {
      //   name: "Month",
      //   categories: last12Data.map((item) => formatDate(item.date, "month")),
      //   data: [{ data: last12Data.map((item) => item.investment) }],
      // },
      // {
      //   name: "Year",
      //   categories: last12Data.map((item) => formatDate(item.date, "year")),
      //   data: [{ data: last12Data.map((item) => item.investment) }],
      // },
    ],
  };
};
