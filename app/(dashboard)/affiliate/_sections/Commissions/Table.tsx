'use client';

import CustomTable from '@/components/CustomTable';
import CustomPopover from '@/components/custom-popover/custom-popover';
import usePopover from '@/components/custom-popover/use-popover';
import Icon from '@/components/icon';
import { useIsMobile } from '@/hooks/use-responsive';
import useToggleState from '@/hooks/use-toggle-state';
import { useTranslate } from '@/locales';
import { useGetAffiliateCommissionList } from '@/services/minecraft/affiliate/affiliate';
import type { PayoutHttpPayoutCommissionResponse } from '@/services/minecraft/minecraftAPI.schemas';
import { toTitleCase } from '@/utils/change-case';
import { fDate } from '@/utils/format-time';
import { formatCurrency, toNumber } from '@/utils/toNumber';
import { Box, Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import type React from 'react';
import { type ChangeEvent, type FC, useCallback, useMemo, useState } from 'react';
import DownLoadCommissionModal from './DownLoadCommissionModal';
import dayjs from 'dayjs';
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

const AffCommissionsTabTable: FC = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const [open, toggle] = useToggleState();
  const columns = useMemo(
    () => [
      {
        title: t('affCommissionsTabTable.userID'),
        modify: (row: PayoutHttpPayoutCommissionResponse) => row.user_id,
      },
      {
        title: t('affCommissionsTabTable.userEmail'),
        modify: (row: PayoutHttpPayoutCommissionResponse) => row.email,
      },
      {
        title: t('affCommissionsTabTable.amount'),
        modify: (row: PayoutHttpPayoutCommissionResponse) => formatCurrency(row.amount),
      },
      {
        title: t('affCommissionsTabTable.packageName'),
        modify: (row: PayoutHttpPayoutCommissionResponse) => toTitleCase(row.plan_type!),
      },
      {
        title: t('affCommissionsTabTable.percentage'),
        modify: (row: PayoutHttpPayoutCommissionResponse) => toNumber(row.percent),
      },
      {
        title: t('affCommissionsTabTable.commissionDate'),
        modify: (row: PayoutHttpPayoutCommissionResponse) =>
          fDate(toNumber(row.created_at) * 1000, 'DD.MM.YYYY'),
      },
    ],
    [t]
  );
  const filterPopover = usePopover();
  const [page, setpage] = useState(1);
  const [dates, setDates] = useState<any>([]);
  const filterOpts = {
    filters: {
      ...(dates?.[0] && { from_created_at: fDate(dates?.[0], 'YYYY-MM-DD') }),
      ...(dates?.[1] && { to_created_at: fDate(dates?.[1], 'YYYY-MM-DD') }),
    },
    sorts: { created_at: false },
    page: page,
    per_page: 10,
  };

  const { data: commissionList, isLoading } = useGetAffiliateCommissionList({
    opts: JSON.stringify(filterOpts),
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
    setpage(newPage as any);
  };

  return (
    <Stack px={{ md: 4, xs: 0 }} pt={3}>
      <Stack alignItems="flex-start" sx={{ width: '100%' }}>
        <CustomTable
          containerHeight={'max-content'}
          page={filterOpts.page}
          isPending={isLoading}
          handleChangePage={handleChangePage}
          totalCount={commissionList?.meta?.total_count || 0}
          title={t('affCommissionsTabTable.commissionsTitle')}
          columns={columns}
          data={commissionList?.data || []}
          emptyTitle={t('affCommissionsTabTable.noRecord')}
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
          action={
            <Box>
              <Stack
                direction={'row'}
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
                      maxDate={dayjs()}
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
                      minDate={dates?.[0]}
                      maxDate={dayjs()}
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
        {open && <DownLoadCommissionModal open={open} close={toggle} />}
      </Stack>
    </Stack>
  );
};

export default AffCommissionsTabTable;
