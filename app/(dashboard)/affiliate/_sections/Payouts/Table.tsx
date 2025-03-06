'use client';

import type React from 'react';
import { type ChangeEvent, type FC, useCallback, useMemo, useState } from 'react';

import CustomTable from '@/components/CustomTable';
import useToggleState from '@/hooks/use-toggle-state';
import { useTranslate } from '@/locales';
import { fDate } from '@/utils/format-time';
import { formatCurrency } from '@/utils/toNumber';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import DownloadModal from './DownloadModal';
import { useIsMobile } from '@/hooks/use-responsive';
import { useGetFinancialPayouts } from '@/services/minecraft/financial/financial';
import Icon from '@/components/icon';
import usePopover from '@/components/custom-popover/use-popover';
import CustomPopover from '@/components/custom-popover/custom-popover';
import type { PayoutHttpPayoutResponse } from '@/services/minecraft/minecraftAPI.schemas';

const datePickerStyle = {
  '.MuiIconButton-root': {
    color: 'white',
    mr: 0,
  },
};

const slotProps = {
  switchViewButton: { sx: { color: 'white' } },
  previousIconButton: { sx: { color: 'white' } },
  nextIconButton: { sx: { color: 'white' } },
  calendarHeader: { sx: { '.MuiPickersCalendarHeader-label': { color: 'white' } } },
  desktopPaper: {
    sx: {
      '.MuiPickersYear-yearButton': { color: 'white' },
      backgroundColor: 'dark.2',
      boxShadow: '0px 24px 64px 0px rgba(0, 0, 0, 0.24)',
      border: '1px solid',
      borderColor: 'dark.3',
    },
  },

  day: {
    sx: {
      color: 'white',
      typography: 'p2-medium',

      '&.MuiPickersDay-today': {
        bgcolor: 'white',
        color: 'dark.1',
      },
    },
  },
};

const AffPayoutsTabTable: FC = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const [open, toggle] = useToggleState();
  const columns = useMemo(
    () => [
      {
        title: t('affPayoutsTabTable.userId'),
        modify: (row: PayoutHttpPayoutResponse) => row.user_id,
      },
      {
        title: t('affPayoutsTabTable.walletId'),
        modify: (row: PayoutHttpPayoutResponse) => row.wallet_id,
      },
      {
        title: t('affPayoutsTabTable.amount'),
        modify: (row: PayoutHttpPayoutResponse) => formatCurrency(row.amount),
      },
      {
        title: t('affPayoutsTabTable.date'),
        modify: (row: PayoutHttpPayoutResponse) => fDate(row.created_at, 'DD.MM.YYYY'),
      },
      {
        title: t('affPayoutsTabTable.status'),
        modify: (row: PayoutHttpPayoutResponse) => row.status,
      },
    ],
    [t]
  );

  const filterPopover = usePopover();
  const [page, setpage] = useState(1);
  const [dates, setDates] = useState<any>([]);
  const filter = {
    filters: {
      ...(dates?.[0] && { from_created_at: fDate(dates?.[0], 'yyyy-MM-dd') }),
      ...(dates?.[1] && { to_created_at: fDate(dates?.[1], 'yyyy-MM-dd') }),
    },
    sorts: { created_at: false },
    page: page,
    per_page: 10,
  };

  const { data, isPending } = useGetFinancialPayouts({
    opts: JSON.stringify(filter),
  });

  const handleOpenFilter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      filterPopover.onOpen(event);
    },
    [filterPopover]
  );

  const handleCloseFilter = useCallback(() => {
    filterPopover.onClose();
  }, [filterPopover]);

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setpage(newPage);
  };

  return (
    <Stack px={{ md: 4, xs: 0 }} pt={3}>
      <Stack alignItems="flex-start" maxWidth={{ md: 'calc(100vw - 64px)', xs: '100vw' }}>
        <CustomTable
          title={t('affPayoutsTabTable.payouts')}
          columns={columns}
          page={page}
          handleChangePage={handleChangePage}
          totalCount={data?.meta?.total_count}
          data={(data?.data as any) || []}
          isPending={isPending}
          mobileAction={
            <Button
              startIcon={<Icon name="DownloadIcon" />}
              color={isMobile ? 'primary' : 'tertiary'}
              sx={{ width: '100%' }}
              onClick={toggle}
            >
              {t('affPayoutsTabTable.dwonloadStatement')}
            </Button>
          }
          emptyTitle={t('affPayoutsTabTable.emptyTitle')}
          emptySubtitle={t('affPayoutsTabTable.emptySubtitle')}
          action={
            <Box>
              <Stack
                direction="row"
                alignItems={'center'}
                gap={2}
                pl={isMobile ? 5 : undefined}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Box onClick={handleOpenFilter} sx={{ display: 'flex' }}>
                  <Typography variant="p2-semi-bold">
                    {dates.length
                      ? `${t('affPayoutsTabTable.from')} ${fDate(dates?.[0], 'DD.MM.YYYY') || '-'} ${t(
                          'affPayoutsTabTable.to'
                        )} ${fDate(dates?.[1], 'DD.MM.YYYY') || '-'}`
                      : t('affPayoutsTabTable.dateAndTime')}
                  </Typography>
                  <Icon name={filterPopover.open ? 'ArrowUpIcon' : 'ArrowDownIcon'} />
                </Box>
                <Stack>
                  <Button
                    startIcon={<Icon name="DownloadIcon" />}
                    color="tertiary"
                    onClick={toggle}
                    sx={{ display: { md: 'flex', xs: 'none' } }}
                  >
                    {t('affPayoutsTabTable.dwonloadStatement')}
                  </Button>
                </Stack>
              </Stack>

              <CustomPopover
                open={filterPopover.open}
                onClose={handleCloseFilter}
                sx={{
                  m: 0,
                  p: 3,
                  border: '1px solid',
                  borderRadius: 2,
                  borderColor: 'dark.3',
                  backgroundColor: 'dark.2',
                  boxShadow: '0px 24px 64px 0px rgba(0, 0, 0, 0.24)',
                  backdropFilter: 'none',
                  backgroundImage: 'none',
                  '> span:first-of-type': {
                    display: 'none',
                  },
                }}
              >
                <Stack gap={2}>
                  <Stack gap={2}>
                    <Typography variant="caption-semi-bold">
                      {t('affPayoutsTabTable.from')}
                    </Typography>

                    <DatePicker
                      format="DD.MM.YYYY"
                      value={dates?.[0] || null}
                      slotProps={slotProps}
                      sx={datePickerStyle}
                      onChange={(value) => {
                        setDates((state: any) => [value, state?.[1]]);
                      }}
                      desktopModeMediaQuery="@media (min-width: 0px)"
                    />
                  </Stack>

                  <Stack gap={2}>
                    <Typography variant="caption-semi-bold">
                      {t('affPayoutsTabTable.to')}
                    </Typography>

                    <DatePicker
                      format="DD.MM.YYYY"
                      slotProps={slotProps}
                      value={dates?.[1] || null}
                      sx={datePickerStyle}
                      onChange={(value) => {
                        setDates((state: any) => [state?.[0], value]);
                      }}
                      desktopModeMediaQuery="@media (min-width: 0px)"
                    />
                  </Stack>
                </Stack>
              </CustomPopover>
            </Box>
          }
        />
        {open && <DownloadModal open={open} close={toggle} />}
      </Stack>
    </Stack>
  );
};

export default AffPayoutsTabTable;
