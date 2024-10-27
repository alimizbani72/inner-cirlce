import { Icon } from "@/components/icons";
import { Stack, Typography } from "@mui/material";
import Badge from "./Badge";
import MorePortfolioAction from "./MorePortfolioAction";
import { useTranslate } from "@/locales";
import type { Portfolio, SelectedPortfolio } from "../type";
import TransactionActionButton from "./TransactionActionButton";

type PortfolioSummaryProps = {
  selectedPortfolio: SelectedPortfolio;
  portfolios: Portfolio[];
  portfolioId: string | string[] | null;
};

const PortfolioSummary = ({ selectedPortfolio, portfolios, portfolioId }: PortfolioSummaryProps) => {
  const { t } = useTranslate();
  const currentPortfolio = portfolios.find((portfolio) => portfolio.id === portfolioId);
  const isOverviewTab = !portfolioId;

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
            <Stack direction={"row"} spacing={1}>
              <Icon name="More-rectangle" />
              <Typography variant="p2-semi-bold" whiteSpace={"nowrap"}>
                {t("portfolioSummary.overview")}
              </Typography>
            </Stack>
          ) : (
            <Stack direction={"row"} spacing={1}>
              <MorePortfolioAction portfolio={currentPortfolio} />
              <Typography>{currentPortfolio?.avatar}</Typography>
              <Typography variant="p2-semi-bold" whiteSpace={"nowrap"}>
                {currentPortfolio?.name}
              </Typography>
            </Stack>
          )}
          <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
            <Badge color="white" label="invested value" value={selectedPortfolio?.total_invested} />
            <Badge color="success.main" label="Realized profit" value={selectedPortfolio?.total_profit} />
            <Badge color="error.main" label="Realized Loss" value={selectedPortfolio?.total_loss} />
          </Stack>
        </Stack>
        {!isOverviewTab && <TransactionActionButton btnText={t("portfolioSummary.addTransaction")} />}
      </Stack>
    </Stack>
  );
};

export default PortfolioSummary;
