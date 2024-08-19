"use client";

import { Stack } from "@mui/material";
import type { FC } from "react";
import StrategiesItem from "./StrategiesItem";
import { plans } from "@/configs/plans";
import { getUserPlanType } from "@/consts";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

type Props = {};

const PortfolioStrategiesSection: FC<Props> = () => {
  const { t } = useTranslate();
  const userInfo = useAppSelector(selectUser);

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
          subtitle={t("global.strategy")}
          src={value.rive}
          type={key}
          upgrade={plans[getUserPlanType(userInfo) as keyof typeof plans].order < value.order}
        />
      ))}
    </Stack>
  );
};

export default PortfolioStrategiesSection;
