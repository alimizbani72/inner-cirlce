"use client";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";
import { useIsMobile } from "@/hooks/use-responsive";
import { customInstance } from "@/scripts/fetcher";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import BoxList from "./box";
import Card from "./card";
import Header from "./header";
import TableOfContent from "./tableContent";
const dummyReports = {
  marketdata: {
    title: "Market Data Overview",
    description:
      "Bitcoin is currently trading in a strong bullish structure with increasing volume and institutional demand. Market cap dominance remains high compared to altcoins.",
  },

  fundamentals: {
    title: "Fundamental Analysis",
    description:
      "Bitcoin continues to be the leading store of value in crypto. Network security, hash rate, and adoption metrics are all trending upward.",
  },

  technicals: {
    title: "Technical Analysis",
    description:
      "Price is above key moving averages with strong support at $60K. RSI indicates slight overbought conditions but trend remains bullish.",
  },

  sentiment: {
    title: "Market Sentiment",
    description:
      "Investor sentiment is currently optimistic. Fear & Greed Index is in the greed zone, indicating strong buying pressure.",
  },
};
export const useCoinReportSlug = (slug: string) => {
  return useQuery({
    queryKey: ["coin-report-slug", slug],
    queryFn: async () => {
      return await customInstance<any>({
        url: `/coin-report/${slug}`,
      });
    },
    enabled: !!slug,
  });
};
const TradingViewWidget = dynamic(
  () => import("./tradingview/TradingViewWidget"),
  { ssr: false },
);

const CoinReportDetailSection = () => {
  const isMobile = useIsMobile();
  const { coinId } = useParams();
  const { data, isPending, isError } = useCoinReportSlug(coinId as string);
  const coin = data?.data;

  const safeCoin = {
    category: coin?.category ?? "btc",
    circulating_supply: coin?.circulating_supply ?? 19500000,
    current_price: coin?.current_price ?? 65000,
    liquidity_index: coin?.liquidity_index ?? 80,
    market_cap: coin?.market_cap ?? 1200000000000,
    max_supply: coin?.max_supply ?? 21000000000,
    total_supply: coin?.total_supply ?? 19500000,

    symbol: coin?.symbol ?? "BTC",

    cmr: coin?.cmr ?? 75,
    rtl: coin?.rtl ?? 60,
    data_sufficiency: coin?.data_sufficiency ?? 90,
    risk_level: coin?.risk_level ?? "medium",

    potential_multiplier: coin?.potential_multiplier ?? 2.5,
    potential_multiplier_start_date:
      coin?.potential_multiplier_start_date ?? "2026-01-01",
    potential_multiplier_end_date:
      coin?.potential_multiplier_end_date ?? "2026-12-31",

    target_price: coin?.target_price ?? 85000,
    target_price_date: coin?.target_price_date ?? "2026-06-01",

    report_summery:
      coin?.report_summery ??
      "Default market analysis: stable conditions with moderate volatility.",

    reports: coin?.reports ?? [],
  };
  if (isPending) {
    return (
      <Stack width="100%" height="100%" alignItems="center">
        <Loading sx={{ width: "100%", height: "100%" }} />
      </Stack>
    );
  }
  if (isError) {
    return (
      <Stack width="100%" height="100%" alignItems="center">
        <Empty sx={{ width: "100%", height: "100%" }} icon="WarningIcon" />
      </Stack>
    );
  }

  return (
    <Stack spacing={3} p={4} pb={0} height={"100%"}>
      {!isMobile && <TradingViewWidget rawSymbol={data.data.symbol} />}
      <Header
        // logo={data?.data?.logo}
        ee_signal={data?.data?.ee_signal}
        name={data?.data?.name}
        symbol={data?.data?.symbol}
        plan_type={data?.data?.plan_type as string}
        isFavorite={(data.data as any)?.is_favorite}
      />
      <BoxList
        category={safeCoin.category}
        circulating_supply={safeCoin.circulating_supply}
        current_price={safeCoin.current_price}
        liquidity_index={safeCoin.liquidity_index}
        market_cap={safeCoin.market_cap}
        max_supply={safeCoin.max_supply}
        total_supply={safeCoin.total_supply}
        symbol={safeCoin.symbol}
      />
      <Stack spacing={3} pb={4}>
        <Card
          evaluation={safeCoin.cmr}
          rtl={safeCoin.rtl}
          ds={safeCoin.data_sufficiency}
          potential_multiplier={safeCoin.potential_multiplier}
          potential_multiplier_end_date={safeCoin.potential_multiplier_end_date}
          potential_multiplier_start_date={
            safeCoin.potential_multiplier_start_date
          }
          risk_level={safeCoin.risk_level}
          target_price={safeCoin.target_price}
          target_price_date={safeCoin.target_price_date}
          report_summary={safeCoin.report_summery}
        />

        <TableOfContent reports={dummyReports} />
      </Stack>
    </Stack>
  );
};

export default CoinReportDetailSection;
