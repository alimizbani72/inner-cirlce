import { Stack } from '@mui/material';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import { ChartHistory } from './ChartHistory';
import { useTranslate } from '@/locales';
import type { Dispatch, SetStateAction } from 'react';

interface RenderContentProps {
  loading: boolean;
  chartData:
    | {
        x: number;
        y: number;
      }[]
    | null;
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
}

export const RenderContent = (props: RenderContentProps) => {
  const { loading, chartData, filter, setFilter } = props;
  const { t } = useTranslate();
  if (loading) {
    return (
      <Stack>
        <Loading />
      </Stack>
    );
  }

  if (!chartData?.length) {
    return <Empty />;
  }

  return (
    <ChartHistory
      title={t('history.history')}
      setFilter={setFilter}
      chart={{ series: [{ data: chartData }] }}
      filter={filter}
    />
  );
};
