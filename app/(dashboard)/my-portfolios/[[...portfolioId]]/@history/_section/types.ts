import type { Props } from 'react-apexcharts';

export type ChartProps = {
  type: Props['type'];
  series: Props['series'];
  options: Props['options'];
};
export type ChartOptions = Props['options'];
