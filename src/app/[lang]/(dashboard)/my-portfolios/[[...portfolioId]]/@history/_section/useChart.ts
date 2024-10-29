import { useTheme } from "@mui/material/styles";
import type { ChartOptions } from "./types";
import numeral from "numeral";

export function useChart(filter: string, options?: ChartOptions): ChartOptions {
  const theme = useTheme();

  const xaxisOptions = {
    type: "datetime" as const,
    tooltip: { enabled: false },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },

    tickAmount: filter === "7d" ? 7 : filter === "30d" ? 10 : 12,
    labels: {
      format: filter === "7d" ? "dd MMM" : filter === "30d" ? "dd MMM" : "dd MMM",
    },

    ...options?.xaxis,
  };

  return {
    ...options,
    chart: {
      background: theme.palette.dark[2],
      fontFamily: theme.typography.fontFamily,
      foreColor: theme.palette.grey.light,
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        speed: 360,
        animateGradually: { enabled: true, delay: 120 },
        dynamicAnimation: { enabled: true, speed: 360 },
      },
      ...options?.chart,
    },
    colors: options?.colors ?? ["#6E50E7"],
    fill: {
      opacity: 1,
      ...options?.fill,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        gradientToColors: ["#090A23", "#6E50E7"],
        inverseColors: false,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
        ...options?.fill?.gradient,
      },
    },
    stroke: {
      curve: "smooth",
      lineCap: "round",
      width: 2,
      colors: ["#6E50E7"],
      ...options?.stroke,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      ...options?.grid,
      padding: { left: 20, ...options?.grid?.padding },
      xaxis: {
        lines: { show: false },
        ...options?.grid?.xaxis,
      },
    },
    dataLabels: { enabled: false, ...options?.dataLabels },
    xaxis: xaxisOptions,
    yaxis: {
      labels: { formatter: (value) => `$${numeral(value).format("0,0")}` },
      ...options?.yaxis,
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      marker: { show: false },
      theme: "false",
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        return `
        <div style="
          background: var(--Gradients-Gradient-Sky, radial-gradient(50% 50% at 50% 50%, #FFF 0%, #CDDFF2 100%)); 
          color: #070720;
          padding: 12px 24px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16), 0px 0px 0px 4px rgba(255, 255, 255, 0.40) inset;
        ">
          $${numeral(value).format("0,0.00")}
        </div>
      `;
      },
      ...options?.tooltip,
    },
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
      ...options?.markers,
    },
  };
}
