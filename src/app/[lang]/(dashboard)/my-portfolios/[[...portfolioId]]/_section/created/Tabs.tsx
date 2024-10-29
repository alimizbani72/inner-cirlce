"use client";
import { Stack } from "@mui/material";
import TabsItem from "./TabsItem";
import { useAppRouter } from "@/routes/hooks";
import { Icon } from "@/components/icons";
import type { Portfolio } from "../type";
import { useTranslate } from "@/locales";

type TabsProps = {
  portfolios: Portfolio[];
  portfolioId: string | string[] | null;
  overviewId: string;
  overviewtotal_actual_value: string;
};
const Tabs = ({ portfolios, portfolioId, overviewId, overviewtotal_actual_value }: TabsProps) => {
  const router = useAppRouter();
  const { t } = useTranslate();
  const onSelectTab = (id: string) => {
    if ((id === overviewId && !portfolioId) || id === portfolioId) {
      return;
    }
    router.push(id === overviewId ? "/my-portfolios" : `/my-portfolios/${id}`);
  };

  return (
    <Stack direction="row" width={"100%"} spacing={1}>
      <TabsItem
        isActive={!portfolioId}
        portfolioName={t("portfolioSummary.overview")}
        portfolioAvatar={(<Icon name="More-rectangle" />) as any}
        bgColor="dark.3"
        price={overviewtotal_actual_value}
        onClick={() => onSelectTab(overviewId)}
      />
      {portfolios.map((portfolio) => (
        <TabsItem
          key={portfolio.id}
          isActive={portfolioId === portfolio.id}
          portfolioName={portfolio.name}
          portfolioAvatar={portfolio.avatar}
          bgColor={portfolio.background_color}
          price={portfolio.actual_value!}
          onClick={() => onSelectTab(portfolio.id)}
        />
      ))}
    </Stack>
  );
};

export default Tabs;
