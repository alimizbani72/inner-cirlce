import { useIsMobile } from '@/hooks/use-responsive';
import { selectCoinsTimer } from '@/lib/features/timer/timerSlice';
import { useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { Stack, Typography } from '@mui/material';
import type { FilterFormDataType } from '../types';
import CountDownUpdateTime from './CountDownUpdateTime';
import FilterButton from './FilterButton';
import SearchInput from './SearchInput';
import TimeFrames from './TimeFrams';

interface HeaderProps {
  onFilterChange?: (filter: FilterFormDataType) => void;
  filters: FilterFormDataType;
  onNextUpdate: () => void;
}

export const Header = ({ onFilterChange, filters, onNextUpdate }: HeaderProps) => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const timeSeconds = useAppSelector(selectCoinsTimer);
  const handleChangeFilter = (value: any, name?: string) => {
    onFilterChange?.(name ? { ...filters, [name]: value } : value);
  };

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      justifyContent={'space-between'}
      sx={{ width: '100%', py: 3, px: { xs: 1.5, sm: 3 } }}
      gap={3}
    >
      <Stack direction={'row'} alignItems={'center'} gap={2} sx={{ width: '100%' }}>
        <Typography variant="p1-semi-bold" sx={{ textAlign: 'center' }}>
          {t('coinReportTable.allCoins')}
        </Typography>
        {!!timeSeconds && (
          <CountDownUpdateTime onNextUpdate={onNextUpdate} timeSeconds={timeSeconds} />
        )}

        <TimeFrames
          value={filters?.timeFrame}
          onChange={(value) => handleChangeFilter(value, 'timeFrame')}
        />
      </Stack>
      <Stack direction={'row'} alignItems={'center'} gap={2}>
        <SearchInput onChange={(value) => handleChangeFilter(value, 'query')} />
        <FilterButton onFilterChange={handleChangeFilter} filters={filters} />
      </Stack>
    </Stack>
  );
};
