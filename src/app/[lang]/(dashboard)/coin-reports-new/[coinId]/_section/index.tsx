"use client";
import { Stack } from "@mui/material";
import Card from "./card";
import Header from "./header";
import BoxList from "./box";
import TableOfContent from "./tableContent";
import { useCoinReportServiceCoinReportSlugQuery } from "@minecraft/queries";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import type { SingleCoinReports } from "@minecraft/requests";
import dynamic from "next/dynamic";
import Empty from "@/components/Empty";
import { useIsMobile } from "@/hooks/use-responsive";
const TradingViewWidget = dynamic(() => import("./tradingview/TradingViewWidget"), { ssr: false });
const CoinReportDetailSection = () => {
  const isMobile = useIsMobile();
  const { coinId } = useParams();
  const { data, isPending, isError } = useCoinReportServiceCoinReportSlugQuery({ slug: coinId as string });

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
        <Empty sx={{ width: "100%", height: "100%" }} icon="Warning" />
      </Stack>
    );
  }

  return (
    <Stack spacing={3} p={4} pb={0} height={"100%"}>
      {!isMobile && <TradingViewWidget rawSymbol={data.data?.symbol!} />}
      <Header
        logo={data?.data?.logo}
        ee_signal={data?.data?.ee_signal}
        name={data?.data?.name}
        symbol={data?.data?.symbol}
        plan_type={data?.data?.plan_type as string}
      />
      <BoxList
        category={data?.data?.category}
        circulating_supply={data?.data?.circulating_supply}
        current_price={data?.data?.current_price}
        liquidity_index={data?.data?.liquidity_index}
        market_cap={data?.data?.market_cap}
        max_supply={data?.data?.max_supply}
        total_supply={data?.data?.total_supply}
        symbol={data?.data?.symbol}
      />
      <Stack spacing={3} pb={4}>
        <Card
          // recommended_percentage={data.data?.recommended_percentage}
          evaluation={data?.data?.cmr}
          rtl={data?.data?.rtl}
          ds={data?.data?.data_sufficiency}
          potential_multiplier={data?.data?.potential_multiplier}
          potential_multiplier_end_date={(data?.data as any)?.potential_multiplier_end_date}
          potential_multiplier_start_date={(data?.data as any)?.potential_multiplier_start_date}
          risk_level={data?.data?.risk_level}
          target_price={data?.data?.target_price}
          target_price_date={(data?.data as any)?.target_price_date}
        />
        <TableOfContent reports={data?.data?.reports as SingleCoinReports} />
      </Stack>
    </Stack>
  );
};

export default CoinReportDetailSection;
