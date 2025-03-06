'use client';
import { Box, Divider, Stack } from '@mui/material';
import BoxItems from './BoxItem';
import { useTranslate } from '@/locales';
import { toTitleCase } from '@/utils/change-case';
type Props = {
  current_price: string | undefined;
  liquidity_index: string | undefined;
  market_cap: string | undefined;
  category: string | undefined;
  total_supply: string | undefined;
  circulating_supply: string | undefined;
  max_supply: string | undefined;
  symbol: string | undefined;
};
const BoxList = ({
  current_price,
  liquidity_index,
  market_cap,
  category,
  max_supply,
  circulating_supply,
  total_supply,
  symbol,
}: Props) => {
  const { t } = useTranslate();
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          flexWrap: 'wrap',
          border: '1px solid',
          borderColor: 'dark.3',
          borderRadius: 2,
          bgcolor: 'dark.2',
          overflow: 'hidden',
        }}
      >
        <BoxItems
          title={t('coinReportSingleView.currentPrice')}
          value={current_price}
          hasRightBorder
          hasCurrency
        />
        <Divider />
        <BoxItems
          title={t('coinReportSingleView.currentMarketCap')}
          value={market_cap}
          hasRightBorder
          hasCurrency
        />
        <Divider />
        <BoxItems
          title={t('coinReportSingleView.liquidity')}
          value={liquidity_index}
          hasRightBorder
          symbol="%"
        />
        <Divider />
        <BoxItems
          title={t('coinReportSingleView.category')}
          value={toTitleCase(category as string)}
        />
        <Divider />
        <BoxItems
          title={t('coinReportSingleView.totalsupply')}
          value={total_supply}
          hasRightBorder
          hasTopBorder
          symbol={symbol}
        />
        <Divider />
        <BoxItems
          title={t('coinReportSingleView.maxsupply')}
          value={max_supply}
          hasTopBorder
          hasRightBorder
          symbol={symbol}
        />
        <Divider />
        <BoxItems
          title={t('coinReportSingleView.circulatingSupply')}
          value={circulating_supply}
          hasTopBorder
          width="50%"
        />
      </Stack>
    </Box>
  );
};

export default BoxList;
