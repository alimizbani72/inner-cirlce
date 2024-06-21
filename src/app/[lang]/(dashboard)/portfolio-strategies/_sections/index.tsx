"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import StrategiesItem from "./StrategiesItem";
import { plans } from "@/configs/plans";
import { useAccountServiceAuthUserinfoQuery } from "@minecraft/queries";
import { getUserPlanType } from "@/consts";

type Props = {};

const PortfolioStrategiesSection: FC<Props> = () => {
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

  return (
    <Stack
      sx={{ p: { md: 4, xs: 3 } }}
      gap={{ md: 3, xs: 2 }}
      direction={{ md: "row", xs: "column" }}
      flexWrap={{ md: "wrap", xs: undefined }}
      alignItems={{ md: "flex-start", xs: undefined }}
      justifyContent="flex-start"
    >
      {Object.entries(plans).map(([key, value]) => (
        <StrategiesItem
          key={key}
          subtitle="Strategy"
          src={value.rive}
          type={key}
          upgrade={plans[getUserPlanType(userInfo) as keyof typeof plans].order < value.order}
        />
      ))}
    </Stack>
  );
};

export default PortfolioStrategiesSection;
