"use client";
import { Stack } from "@mui/material";
import { ChartHistory } from "./ChartHistory";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useParams } from "next/navigation";
import { getActivePortfolioId } from "../../_section/utils";
import {
  usePortfolioServiceOverviewHistoryQuery,
  usePortfolioServicePortfoliosIdHistoryQuery,
} from "@minecraft/queries";
import { transformDataForChart } from "./utils";

const HistorySection = () => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const { t } = useTranslate();
  const { portfolioId } = useParams();

  const activePortfolioId = getActivePortfolioId(portfolioId);

  const { data: overview } = usePortfolioServiceOverviewHistoryQuery(undefined, undefined, {
    enabled: !activePortfolioId,
  });

  const { data: portfoliohistory } = usePortfolioServicePortfoliosIdHistoryQuery(
    {
      id: activePortfolioId,
    },
    undefined,
    { enabled: !!activePortfolioId }
  );

  const selectedPortfolio = activePortfolioId ? portfoliohistory : overview;
  const chartData = transformDataForChart(selectedPortfolio?.data || []);

  return (
    <Stack
      width={{ md: "50%", xs: "100%" }}
      maxWidth={{ md: isCollapsed ? "calc(50vw - 97px)" : "calc(50vw - 168px)" }}
    >
      <ChartHistory title={t("history.history")} chart={chartData as any} />
    </Stack>
  );
};

export default HistorySection;
