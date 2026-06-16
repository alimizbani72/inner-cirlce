import Icon from "@/components/icon";
import { useTranslate } from "@/locales";
import { Stack, Typography } from "@mui/material";
import usePortfolioData from "../hook/usePortfolioData";
import type { PortfolioResponse } from "../typess";
import Badge from "./Badge";
import MorePortfolioAction from "./MorePortfolioAction";
import TransactionActionButton from "./TransactionActionButton";

type PortfolioSummaryProps = {
  portfolios: PortfolioResponse;
};

const PortfolioSummary = ({ portfolios }: PortfolioSummaryProps) => {
  const { t } = useTranslate();
  const { selectedPortfolio, portfolioId, isLoading } = usePortfolioData();
  const normalizedPortfolioId = Array.isArray(portfolioId)
    ? portfolioId[0]
    : portfolioId;

  const isOverviewTab = !normalizedPortfolioId;

  return (
    <Stack px={{ xs: 3, md: 4 }} pt={{ xs: 3, md: 4 }} pb={4}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: undefined, md: "center" }}
        spacing={2}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: undefined, md: "center" }}
          spacing={2}
          flexWrap={"wrap"}
        >
          {isOverviewTab ? (
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ "& svg path": { strokeOpacity: 1 } }}
            >
              <Icon name="MorerectangleIcon" />
              <Typography variant="p2-semi-bold" whiteSpace={"nowrap"}>
                {t("portfolioSummary.overview")}
              </Typography>
            </Stack>
          ) : (
            <Stack direction={"row"} spacing={1}>
              <MorePortfolioAction />
              <Typography>{portfolios?.data.avatar}</Typography>
              <Typography variant="p2-semi-bold" whiteSpace={"nowrap"}>
                {portfolios?.data?.name}
              </Typography>
            </Stack>
          )}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            flexWrap={"wrap"}
          >
            <Badge
              label="Total invest"
              value={`${selectedPortfolio?.data?.total_invested!}`}
              prefixValue="$"
              customColor="white"
              isLoading={isLoading}
            />
            <Badge
              label="Realized PNL"
              value={selectedPortfolio?.data?.total_realized as any}
              prefixValue="$"
              isLoading={isLoading}
            />
            <Badge
              label="UNRealized PNL"
              value={selectedPortfolio?.data?.total_unrealized as any}
              prefixValue="$"
              isLoading={isLoading}
            />
          </Stack>
        </Stack>
        {!isOverviewTab && (
          <TransactionActionButton
            btnText={t("portfolioSummary.addTransaction")}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default PortfolioSummary;
