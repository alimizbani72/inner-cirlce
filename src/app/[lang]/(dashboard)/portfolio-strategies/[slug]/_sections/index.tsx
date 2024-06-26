"use client";

import { Stack } from "@mui/material";
import Notice from "./Notice";
import Table from "./Table";
import type { FC } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { useContentServiceContentPortfolioStrategyPlanQuery } from "@minecraft/queries";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";
import { useTranslate } from "@/locales";

type Props = { pageTitle: string; plan: string };

const PortfolioStrategiesInnerSection: FC<Props> = ({ pageTitle, plan }) => {
  usePageTitle({ title: pageTitle, hasBackButton: true });
  const { error, isPending } = useContentServiceContentPortfolioStrategyPlanQuery({ plan });
  const { t } = useTranslate();

  if (isPending) {
    return (
      <Stack width="100%" height="100%" alignItems="center">
        <Loading sx={{ mt: 0, width: "100%", height: "100%" }} />
      </Stack>
    );
  }

  if ((error as any)?.status === 403) {
    return (
      <Stack width="100%" height="100%" alignItems="center">
        <Empty
          sx={{ mt: 0, width: "100%", height: "100%" }}
          icon="Warning--colorful"
          title={t("portfolioStrategiesInnerSection.upgradeMessage")}
        />
      </Stack>
    );
  }

  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      <Notice />

      <Table plan={plan} />
    </Stack>
  );
};

export default PortfolioStrategiesInnerSection;
