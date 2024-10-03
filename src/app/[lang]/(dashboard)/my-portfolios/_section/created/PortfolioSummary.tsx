import { Icon } from "@/components/icons";
import { Button, Stack, Typography } from "@mui/material";
import Badge from "./Badge";
import { selectSelectedPortfolioId } from "@/lib/features/portfolio/portfolioSlice";
import { useAppSelector } from "@/lib/hooks";
import useToggleState from "@/hooks/use-toggle-state";
import TransactionModal from "./transaction/TransactionModal";
import MorePortfolioAction from "./MorePortfolioAction";
import { useTranslate } from "@/locales";

const portfolioSummary = [
  {
    id: 1,
    portfolioName: "Main Portfolio",
    avatar: "🛡️",
    investedValue: 21400.55,
    profit: 1800.99,
    loss: -800.99,
  },
  {
    id: 2,
    portfolioName: "Second Portfolio",
    avatar: "🚀",
    investedValue: 10300.0,
    profit: 1200.5,
    loss: -200.0,
  },
  {
    id: 3,
    portfolioName: "Third Portfolio",
    avatar: "🥶",
    investedValue: 5000000,
    profit: 300.0,
    loss: -150.0,
  },
];

const PortfolioSummary = () => {
  const [open, toggleTransactionModal] = useToggleState();
  const { t } = useTranslate();
  const selectedTabId = useAppSelector(selectSelectedPortfolioId);
  const activePortfolio = portfolioSummary.find((portfolio) => portfolio.id === selectedTabId);

  if (!activePortfolio) {
    return null;
  }

  return (
    <>
      <Stack px={{ xs: 3, md: 4 }} pt={{ xs: 3, md: 4 }} pb={4}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: undefined, md: "center" }} spacing={2}>
          <Stack direction={"row"} spacing={1}>
            <MorePortfolioAction />
            <Typography>{activePortfolio.avatar}</Typography>
            <Typography variant="p2-semi-bold" whiteSpace={"nowrap"}>
              {activePortfolio.portfolioName}
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
            <Badge color="white" label="invested value" value={activePortfolio.investedValue} />
            <Badge color="success.main" label="profit" value={activePortfolio.profit} />
            <Badge color="error.main" label="Loss" value={activePortfolio.loss} />
          </Stack>
          <Button
            onClick={toggleTransactionModal}
            startIcon={<Icon name="Plus" />}
            sx={{ ml: { xs: undefined, md: "auto" } }}
          >
            {t("portfolioSummary.addTransaction")}
          </Button>
        </Stack>
      </Stack>
      {open && <TransactionModal open={open} close={toggleTransactionModal} />}
    </>
  );
};

export default PortfolioSummary;
