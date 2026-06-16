"use client";

import Icon from "@/components/icon";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { Box, Stack } from "@mui/material";
import TabsItem from "./TabsItem";

import {
  selectActivePortfolioId,
  selectPortfolios,
  setActivePortfolioId,
} from "@/lib/features/portfolio/protfolioSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const overviewId = "overview";

type TabsProps = {
  overviewtotal_actual_value: string;
};

const Tabs = ({ overviewtotal_actual_value }: TabsProps) => {
  const router = useAppRouter();
  const { t } = useTranslate();
  const dispatch = useAppDispatch();

  const portfolios = useAppSelector(selectPortfolios);
  const portfolioId = useAppSelector(selectActivePortfolioId);

  const onSelectTab = (id: string) => {
    if ((id === overviewId && !portfolioId) || id === portfolioId) {
      return;
    }

    dispatch(setActivePortfolioId(id));

    router.push(id === overviewId ? "/my-portfolios" : `/my-portfolios/${id}`);
  };

  return (
    <Stack direction="row" width={"100%"} spacing={1}>
      {/* OVERVIEW TAB */}
      <TabsItem
        isActive={!portfolioId}
        portfolioName={t("portfolioSummary.overview")}
        portfolioAvatar={
          <Box sx={{ "& svg path": { strokeOpacity: 1 } }}>
            <Icon name="MorerectangleIcon" />
          </Box>
        }
        bgColor="dark.3"
        customAvatarbgColor={!portfolioId ? "dark.1" : "dark.3"}
        price={overviewtotal_actual_value}
        onClick={() => onSelectTab(overviewId)}
      />

      {/* PORTFOLIO TABS */}
      {portfolios.map((portfolio) => (
        <TabsItem
          key={portfolio.id}
          isActive={portfolioId === portfolio.id}
          portfolioName={portfolio.name}
          portfolioAvatar={portfolio.avatar}
          bgColor={portfolio.background_color}
          price={portfolio.actual_value as any}
          onClick={() => onSelectTab(portfolio.id)}
        />
      ))}
    </Stack>
  );
};

export default Tabs;
