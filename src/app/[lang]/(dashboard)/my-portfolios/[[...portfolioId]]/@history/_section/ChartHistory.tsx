"use client";
import type { CardProps } from "@mui/material/Card";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Chart } from "./Chart";
import { useChart } from "./useChart";
import type { ChartOptions } from "./types";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  loading?: boolean;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      name?: string;
      categories: string[];
      data: {
        data: number[];
      }[];
    }[];
    options?: ChartOptions;
  };
};

export function ChartHistory({ title, subheader, chart, loading, ...other }: Props) {
  // const [selectedSeries, setSelectedSeries] = useState("All");

  // const currentSeries = chart.series.find((i) => i.name === selectedSeries);
  const chartOptions = useChart({
    xaxis: { categories: chart.series[0]?.categories, tooltip: { enabled: false } },
    ...chart.options,
  });

  // const handleChangeSeries = useCallback((newValue: string) => {
  //   setSelectedSeries(newValue);
  // }, []);

  return (
    <Card {...other} sx={{ bgcolor: "dark.2", border: "1.5px solid", borderColor: "dark.3" }}>
      <CardHeader
        sx={{ typography: "p1-medium" }}
        title={title}
        subheader={subheader}
        // action={
        //   <ChartSelect
        //     options={chart.series.map((item) => item.name)}
        //     value={selectedSeries}
        //     onChange={handleChangeSeries}
        //   />
        // }
      />

      <Chart type="area" series={chart.series[0]?.data} options={chartOptions} height={266} sx={{ pb: 2, pr: 1 }} />
    </Card>
  );
}
