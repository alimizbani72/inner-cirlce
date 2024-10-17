import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import Loading from "@/components/Loading";

const ApexChart = dynamic(() => import("react-apexcharts").then((mod) => mod.default), {
  ssr: false,
  loading: () => <Loading />,
});

type ChartProps = {
  seriesData: { x: string; y: number }[];
  onHover: (label: string | null) => void;
};

const Chart = ({ seriesData, onHover }: ChartProps) => {
  const options: ApexOptions = {
    series: [
      {
        data: seriesData,
      },
    ],
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: false,
      theme: "false",
      marker: { show: false },
      custom: function ({ dataPointIndex }) {
        const crypto = seriesData[dataPointIndex];
        return `
          <div style="
            background: radial-gradient(50% 50% at 50% 50%, #FFF 0%, #CDDFF2 100%);
            color: #070720;
            padding: 12px 24px;
            border-radius: 20px;
            font-size: 14px;
          padding: 12px 24px;
            border-radius: 20px;
            font-weight: bold;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16), 0px 0px 0px 4px rgba(255, 255, 255, 0.40) inset;
          ">
            ${crypto.x}: ${crypto.y}%
          </div>
        `;
      },
    },
    chart: {
      dropShadow: {
        enabled: true,
        opacity: 0.2,
      },

      type: "treemap",
      toolbar: { show: false },
      events: {
        dataPointMouseEnter: (_event, _chartContext, config) => {
          const hoveredLabel = config.w.config.series[0].data[config.dataPointIndex].x;
          onHover(hoveredLabel);
        },
        dataPointMouseLeave: () => {
          onHover(null);
        },
      },
    },
    colors: ["#9799B4", "#7A7C97", "#F3BA2F", "#42435D", "#252740", "#12132D"],
    plotOptions: {
      treemap: { distributed: true, enableShades: false },
    },

    stroke: {
      width: 0,
      colors: ["transparent"],
    },
  };

  return <ApexChart options={options} series={options.series} type="treemap" height="33%" width="100%" />;
};

export default Chart;
