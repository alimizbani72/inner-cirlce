import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { allocationBasedColors } from '@/utils/emojies';
import { useMemo } from 'react';

const ApexChart = dynamic(() => import('react-apexcharts').then((mod) => mod.default), {
  ssr: false,
});

type ChartProps = {
  seriesData: { x: string; y: number }[];
  onHover: (label: string | null) => void;
  hoveredCrypto: string | null;
};

const Chart = ({ seriesData, onHover, hoveredCrypto }: ChartProps) => {
  const colorsWithHoverEffect = useMemo(
    () =>
      seriesData.map((crypto, index) =>
        crypto.x === hoveredCrypto
          ? allocationBasedColors[index]
          : `${allocationBasedColors[index]}97`
      ),
    [seriesData, hoveredCrypto]
  );

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
      theme: 'false',
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

      type: 'treemap',
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
    colors: colorsWithHoverEffect,
    plotOptions: {
      treemap: { distributed: true, enableShades: false },
    },
    stroke: {
      width: 0,
      colors: ['transparent'],
    },
  };

  return (
    <ApexChart options={options} series={options.series} type="treemap" height="33%" width="100%" />
  );
};

export default Chart;
