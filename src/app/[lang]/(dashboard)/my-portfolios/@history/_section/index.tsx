"use client";
import { Stack } from "@mui/material";
import { ChartHistory } from "./ChartHistory";

const HistorySection = () => {
  return (
    <Stack width={{ md: "50%", xs: "100%" }}>
      <ChartHistory
        title="History"
        chart={{
          series: [
            {
              name: "All",
              categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
              data: [{ data: [2400000, 1200000, 6400000, 9600000, 760000, 4199000] }],
            },
            {
              name: "Weekly",
              categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
              data: [{ data: [1000, 4123, 3523, 15132, 49222] }],
            },
            {
              name: "Monthly",
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
              data: [{ data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
            },
            {
              name: "Yearly",
              categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
              data: [{ data: [24, 72000, 64000, 96000, 76, 41] }],
            },
          ],
        }}
      />
    </Stack>
  );
};

export default HistorySection;
