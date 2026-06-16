"use client";

import { plans } from "@/configs/plans";
import { getUserPlanType } from "@/consts";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import { Stack } from "@mui/material";
import type { FC } from "react";
import LoadingStrategyCard from "./LoadingStrategyCard";
import StrategiesItem from "./StrategiesItem";

type Props = {};

const PortfolioStrategiesSection: FC<Props> = () => {
  const { t } = useTranslate();
  const { data: userInfo, isFetching } = useGetMe();

  if (isFetching) {
    return <LoadingStrategyCard />;
  }
  const userPlanKey = getUserPlanType(userInfo?.data) as keyof typeof plans;
  const userPlan = plans[userPlanKey];
  return (
    <Stack
      sx={{ p: { md: 4, xs: 3 } }}
      maxWidth={"100vw"}
      gap={{ md: 3, xs: 2 }}
      direction={{ md: "row", xs: "column" }}
      flexWrap={{ md: "wrap", xs: undefined }}
      alignItems={{ md: "flex-start", xs: undefined }}
      justifyContent="flex-start"
    >
      {Object.entries(plans)
        .filter(([key]) => key !== "plankton")
        .map(([key, value]) => (
          <StrategiesItem
            key={key}
            subtitle={t("global.strategy")}
            src={value.rive}
            type={key}
            upgrade={userPlan ? userPlan.order < value?.order : false}
          />
        ))}
    </Stack>
  );
};

export default PortfolioStrategiesSection;
