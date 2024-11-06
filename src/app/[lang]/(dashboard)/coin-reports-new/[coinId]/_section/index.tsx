"use client";
import { Stack } from "@mui/material";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { getUserPlanType } from "@/consts";
import { plans } from "@/configs/plans";
import Card from "./card";
import Header from "./header";
import BoxList from "./box";
import Upgrade from "./Upgrade";
import TableOfContent from "./tableContent";
const mockData = {
  logo: "/assets/svg/btc.svg",
  name: "Bitcoin",
  symbol: "BTC",
  packageType: "shrimp",
  category: "Layer 1",
  cmr: 0.1428,
  ee_signal: 4,
  max_supply: 21113123123123,
  potential_multiplicator: 25,
  rtl: 20,
  risk_level: "Low Risk",
  current_price: 63331.879,
  target_price: 95,
  data_sufficiency: 20,
  circulating_supply: 1835785100123,
  total_supply: 21000000,
  market_cap: 833187993.24,
  volume_24h: 5631789.45,
  liquidity_index: 3.21,
};
const CoinReportDetailSection = () => {
  const userInfo = useAppSelector(selectUser);
  const userPlanType = plans[getUserPlanType(userInfo) as keyof typeof plans]?.order;
  const packageOrder = plans[mockData.packageType as keyof typeof plans].order;
  const needsUpgrade = packageOrder > userPlanType;

  return (
    <Stack spacing={3} p={4} pb={0} height={"100%"}>
      <Header
        logo={mockData.logo}
        ee_signal={mockData.ee_signal}
        name={mockData.name}
        symbol={mockData.symbol}
        packageType={mockData.packageType}
        needsUpgrade={needsUpgrade}
      />
      <BoxList
        category={mockData.category}
        circulating_supply={mockData.circulating_supply}
        current_price={mockData.current_price}
        liquidity_index={mockData.liquidity_index}
        market_cap={mockData.market_cap}
        max_supply={mockData.max_supply}
        total_supply={mockData.total_supply}
        symbol={needsUpgrade ? "" : mockData.symbol}
      />
      {needsUpgrade ? (
        <Upgrade />
      ) : (
        <Stack spacing={3} pb={4}>
          <Card
            evaluation={mockData.cmr}
            rtl={mockData.rtl}
            ds={mockData.data_sufficiency}
            potential_multiplier={mockData.potential_multiplicator}
            risk_level={mockData.risk_level}
            target_price={mockData.target_price}
          />
          <TableOfContent />
        </Stack>
      )}
    </Stack>
  );
};

export default CoinReportDetailSection;
