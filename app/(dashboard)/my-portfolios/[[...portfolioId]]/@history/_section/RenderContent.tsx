import { Stack } from '@mui/material';
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

  return (
    <Stack
      maxWidth={{
        xs: 'calc(100vw)',
      }}
      width="100%"
      className={loading ? 'loading-skeleton' : ''}
      sx={{ bgcolor: 'dark.2', border: '1.5px solid', borderColor: 'dark.3', borderRadius: 1.5 }}
    >
      {!chartData?.length && !loading ? (
        <Empty />
      ) : (
        <ChartHistory
          title={t('history.history')}
          setFilter={setFilter}
          chart={{ series: [{ data: chartData || [] }] }}
          filter={filter}
        />
      )}
    </Stack>
  );
};
