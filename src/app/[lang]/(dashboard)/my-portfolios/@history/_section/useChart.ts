import { useTheme } from "@mui/material/styles";
import type { ChartOptions } from "./types";

export function useChart(options?: ChartOptions): ChartOptions {
  const theme = useTheme();

  return {
    ...options,

    /** **************************************
     * Chart
     *************************************** */
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
   
    /** **************************************
     * Colors
     *************************************** */
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

    /** **************************************
     * Stroke
     *************************************** */
    stroke: {
      curve: "smooth",
      lineCap: 'round',
      width: 2,
      colors: ["#6E50E7"],
      ...options?.stroke,
    },
   
    /** **************************************
     * Grid
     *************************************** */
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
      ...options?.grid,
      padding: { left: 24,
        ...options?.grid?.padding,
       },
       xaxis: {
        lines: {
          show: false,
        },
        ...options?.grid?.xaxis,
      },
     
    },

    /** **************************************
     * Axis
     *************************************** */
    dataLabels: {
      enabled: false,
      ...options?.dataLabels,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

      ...options?.xaxis,
    },

    yaxis: {
      labels: {
        show: false,
      },
      ...options?.yaxis,
    },
    /** **************************************
     * Tooltip
     *************************************** */
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
            $${value.toFixed(2)}
          </div>
        `;
      },
      ...options?.tooltip,
    },

    /** **************************************
     * Markers
     *************************************** */
    markers: {
      size: 0,
      strokeColors: theme.palette.background.paper,
      ...options?.markers,
    },
  };
}
