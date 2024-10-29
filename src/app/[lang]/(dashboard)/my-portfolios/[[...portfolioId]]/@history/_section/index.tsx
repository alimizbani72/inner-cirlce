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
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";
import { useMemo, useState } from "react";
import { getChartData } from "./utils";

const HistorySection = () => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const { t } = useTranslate();
  const { portfolioId } = useParams();
  const [filter, setFilter] = useState("All");
  const activePortfolioId = getActivePortfolioId(portfolioId);

  const { data: overview, isLoading: overviewLoading } = usePortfolioServiceOverviewHistoryQuery(undefined, undefined, {
    enabled: !activePortfolioId,
  });

  const { data: portfoliohistory, isLoading: portfolioDetailLoading } = usePortfolioServicePortfoliosIdHistoryQuery(
    {
      id: activePortfolioId,
    },
    undefined,
    { enabled: !!activePortfolioId }
  );

  const loading = activePortfolioId ? portfolioDetailLoading : overviewLoading;
  const selectedPortfolio = activePortfolioId ? portfoliohistory : overview;

  const chartData = useMemo(() => getChartData(selectedPortfolio, filter), [selectedPortfolio, filter]);

  return (
    <Stack
      width={{ md: "50%", xs: "100%" }}
      maxWidth={{ md: isCollapsed ? "calc(50vw - 97px)" : "calc(50vw - 168px)" }}
      sx={{ bgcolor: "dark.2", border: "1.5px solid", borderColor: "dark.3", borderRadius: 1.5 }}
    >
      {loading ? (
        <Stack>
          <Loading />
        </Stack>
      ) : !chartData?.length ? (
        <Empty />
      ) : (
        <ChartHistory
          title={t("history.history")}
          setFilter={setFilter}
          chart={{ series: [{ data: chartData }] }}
          filter={filter}
        />
      )}
    </Stack>
  );
};

export default HistorySection;
