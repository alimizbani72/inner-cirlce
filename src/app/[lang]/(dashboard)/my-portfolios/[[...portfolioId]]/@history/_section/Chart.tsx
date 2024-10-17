import type { BoxProps } from "@mui/material/Box";

import dynamic from "next/dynamic";

import Box from "@mui/material/Box";
import type { ChartProps } from "./types";

import Loading from "@/components/Loading";

const ApexChart = dynamic(() => import("react-apexcharts").then((mod) => mod.default), {
  ssr: false,
  loading: () => <Loading />,
});

export function Chart({
  sx,
  type,
  series,
  height,
  options,
  className,
  width = "100%",
  ...other
}: BoxProps & ChartProps) {
  return (
    <Box
      dir="ltr"
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: "relative",
        color: "white",
        overflow: "hidden",
        ...sx,
      }}
      {...other}
    >
      <ApexChart type={type} series={series} options={options} width="100%" height="100%" />
    </Box>
  );
}
