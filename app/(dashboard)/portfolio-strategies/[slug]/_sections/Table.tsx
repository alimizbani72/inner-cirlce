'use client';

import CustomTable, { type SortType } from '@/components/CustomTable';
import Toggle from '@/components/Toggle';
import { Scrollbar } from '@/components/scrollbar';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import type { PlansType } from '@/routes/type';
import type { PortfolioStrategyCoin } from '@/services/minecraft/minecraftAPI.schemas';
import { useGetPortfolioStrategyPlan } from '@/services/minecraft/portfolio-strategy/portfolio-strategy';
import ContentStack from '@app-components/ContentStack';
import { CustomMenuItem, CustomSelect } from '@app-components/CustomSelect';
import { useColumns } from '@dashboard/portfolio-strategies/[slug]/_sections/useColumns';
import { Box, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { isFinite as checkInifinte, isNaN as checkNumber } from 'lodash';
import orderBy from 'lodash/orderBy';
import { type FC, useEffect, useMemo, useState } from 'react';

interface TableProps {
  plan: PlansType;
}

const PortfolioTable: FC<TableProps> = ({ plan }) => {
  const { data: content, isLoading } = useGetPortfolioStrategyPlan(plan, {
    query: {
      select(data) {
        if (!data?.data) {
          return data;
        }
        const modifiedData = data.data.map((item, index) => ({
          ...item,
          coins: item.coins?.map((coin, innerIndex) => ({
            ...coin,
            id: `${index}-${innerIndex}`, // Create a unique id using item id and index
          })),
        }));

        return { ...data, data: modifiedData };
      },
    },
  });

  const [value, setValue] = useState<string>(content?.data?.[0]?.strategy ?? '');
  const [sort, setSort] = useState<SortType>();
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const { columns } = useColumns();

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (content?.data?.length && !value) {
      setValue(content.data[0].strategy ?? '');
    }
  }, [content?.data, value]);
  const coins = useMemo(() => {
    const data = content?.data?.find((item) => item.strategy === value)?.coins;
    if (sort && data?.length) {
      const rows = [...data!];
      const key = Object.keys(sort)?.[0] as keyof PortfolioStrategyCoin;

      const sorted = orderBy(
        rows,
        [
          (item) => {
            const value = item[key];
            // Check if the value is a number or can be parsed as a number
            if (
              !checkNumber(parseFloat(value as string)) &&
              checkInifinte(parseFloat(value as string))
            ) {
              return parseFloat(value as string);
            }
            // Otherwise, handle as a string for proper sorting
            return value?.toString()?.toLowerCase();
          },
        ],
        [sort[key] ? 'asc' : 'desc']
      );
      return sorted;
    }

    return data;
  }, [value, sort]);

  const options = useMemo(
    () =>
      content?.data?.map((item) => ({
        label: item.strategy,
        value: item.strategy,
      })) || [],
    [content?.data]
  );

  return (
    <Stack gap={3}>
      {isLoading ? (
        <Box className="loading-skeleton" height={40} width={250} sx={{ ml: 4 }} />
      ) : (
        !!options?.length &&
        (isMobile ? (
          <CustomSelect
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            sx={{ mx: 3 }}
          >
            {options?.map((option) => (
              <CustomMenuItem value={option?.value} key={option?.value}>
                {option.label}
              </CustomMenuItem>
            ))}
          </CustomSelect>
        ) : (
          <Scrollbar>
            <Stack
              pl={{ md: 4, xs: 3 }}
              alignItems="flex-start"
              maxWidth={{
                md: '100%',
                xs: '100vw',
              }}
            >
              <Stack pr={{ md: 4, xs: 3 }}>
                {content?.data?.length && (
                  <Toggle setValue={handleChange} buttons={options} value={value} />
                )}
              </Stack>
            </Stack>
          </Scrollbar>
        ))
      )}

      {false && (
        <Stack px={{ md: 4, xs: 3 }}>
          <ContentStack gap={3}>
            <Typography variant="p1-semi-bold">{t('portfolioTable.strategyPlan')}</Typography>

            <Stack
              gap={3}
              direction={{ md: 'row', xs: 'column' }}
              alignItems={{ md: 'flex-end', xs: undefined }}
            >
              <Stack flex={4 / 12}>
                <InputLabel
                  sx={{
                    typography: 'caption-semi-bold',
                    color: 'white',
                    textTransform: 'uppercase',
                  }}
                  htmlFor="planned-investment"
                >
                  {t('portfolioTable.plannedInvestment')}
                </InputLabel>
                <TextField
                  id="planned-investment"
                  placeholder={t('portfolioTable.enterAmount')}
                  slotProps={{
                    input: { inputMode: 'numeric' },
                    htmlInput: { pattern: '[0-9]*' },
                  }}
                />
              </Stack>

              <Typography flex={8 / 12} variant="p2-regular" color={'grey.light'}>
                {t('portfolioTable.upgradeMessage')}
              </Typography>
            </Stack>
          </ContentStack>
        </Stack>
      )}

      <Stack
        px={{ md: 4, xs: 0 }}
        pb={3}
        width={{
          md: '100%',
          xs: '100%',
        }}
        sx={{
          'table tbody tr td': {
            textWrap: 'nowrap',
          },
        }}
      >
        <CustomTable
          title={`${value ?? ''} ${t('portfolioTable.strategy')}`}
          columns={columns}
          data={coins || []}
          onSortChange={(val) => setSort(val)}
          isPending={isLoading}
          sort={sort}
          isStickyFirstColumn
        />
      </Stack>
    </Stack>
  );
};

export default PortfolioTable;
