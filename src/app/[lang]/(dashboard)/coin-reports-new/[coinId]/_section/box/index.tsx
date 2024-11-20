"use client";
import { Box, Divider, Stack } from "@mui/material";
import BoxItems from "./BoxItem";
import { useTranslate } from "@/locales";
type Props = {
  current_price: number | undefined;
  liquidity_index: number | undefined;
  market_cap: number | undefined;
  category: string | undefined;
  total_supply: number | undefined;
  circulating_supply: number | undefined;
  max_supply: number | undefined;
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
        direction={{ xs: "column", md: "row" }}
        sx={{
          flexWrap: "wrap",
          border: "1px solid",
          borderColor: "dark.3",
          borderRadius: 2,
          bgcolor: "dark.2",
          overflow: "hidden",
        }}
      >
        <BoxItems title={t("coinreportsingleview.currentPrice")} value={current_price} hasrightBorder hascurrency />
        <Divider />
        <BoxItems title={t("coinreportsingleview.currentMarketCap")} value={market_cap} hasrightBorder hascurrency />
        <Divider />
        <BoxItems title={t("coinreportsingleview.liquidity")} value={liquidity_index} hasrightBorder symbol="%" />
        <Divider />
        <BoxItems title={t("coinreportsingleview.category")} value={category} />
        <Divider />
        <BoxItems
          title={t("coinreportsingleview.totalsupply")}
          value={total_supply}
          hasrightBorder
          hasTopBorder
          symbol={symbol}
        />
        <Divider />
        <BoxItems
          title={t("coinreportsingleview.maxsupply")}
          value={max_supply}
          hasTopBorder
          hasrightBorder
          symbol={symbol}
        />
        <Divider />
        <BoxItems
          title={t("coinreportsingleview.circulatingSupply")}
          value={circulating_supply}
          hasTopBorder
          width="50%"
          hascurrency
        />
      </Stack>
    </Box>
  );
};

export default BoxList;
