"use client";
import { usePageTitle } from "@/hooks/use-page-title";
import LearningBanner from "@dashboard/coin-reports/_sections/LearningBanner";
import { Stack } from "@mui/material";
import type { FC } from "react";
import Notice from "./Notice";
import Table from "./Table";

type Props = { pageTitle: string; plan: string };

const PortfolioStrategiesInnerSection: FC<Props> = ({ pageTitle, plan }) => {
  usePageTitle({ title: pageTitle, hasBackButton: true });
  // const { error, isPending } = usePortfolioStrategyServicePortfolioStrategyPlanQuery({ plan });
  // const { t } = useTranslate();

  // if (isPending) {
  //   return (
  //     <Stack width="100%" height="100%" alignItems="center">
  //       <Loading sx={{ mt: 0, width: "100%", height: "100%" }} />
  //     </Stack>
  //   );
  // }

  // if ((error as any)?.status === 403) {
  //   return (
  //     <Stack width="100%" height="100%" alignItems="center">
  //       <Empty
  //         sx={{ mt: 0, width: "100%", height: "100%" }}
  //         icon="Warning--colorful"
  //         title={t("portfolioStrategiesInnerSection.upgradeMessage")}
  //       />
  //     </Stack>
  //   );
  // }

  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      <LearningBanner />
      <Notice />

      <Table plan={plan} />
    </Stack>
  );
};

export default PortfolioStrategiesInnerSection;
