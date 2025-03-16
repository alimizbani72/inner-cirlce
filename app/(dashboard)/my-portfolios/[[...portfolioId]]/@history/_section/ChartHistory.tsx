'use client';
import type { CardProps } from '@mui/material/Card';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Chart } from './Chart';
import { useChart } from './useChart';
import type { ChartOptions } from './types';
import type { Dispatch, SetStateAction } from 'react';
import FilterTabs from './FilterTabs';

type Props = CardProps & {
  title?: string;
  loading?: boolean;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      data: { x: number; y: number }[];
    }[];
    options?: ChartOptions;
  };
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
};
export function ChartHistory({
  title,
  subheader,
  chart,
  setFilter,
  filter,
  loading,
  ...other
}: Props) {
  const chartOptions = useChart(filter, chart.options);

  return (
    <Card {...other} sx={{ bgcolor: 'dark.2' }}>
      <CardHeader
        sx={{ typography: 'p1-medium' }}
        title={title}
        subheader={subheader}
        action={
          <FilterTabs setValue={setFilter} values={['7d', '30d', 'All']} selectedValue={filter} />
        }
      />

      <Chart
        type="area"
        series={chart.series}
        options={chartOptions}
        height={266}
        sx={{ pb: 2, pr: 1 }}
      />
    </Card>
  );
}
