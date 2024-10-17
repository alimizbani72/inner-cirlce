import { Icon } from "@/components/icons";
import { Button, Stack, Typography } from "@mui/material";
import Badge from "./Badge";
import TransactionModal from "./transaction/TransactionModal";
import MorePortfolioAction from "./MorePortfolioAction";
import { useTranslate } from "@/locales";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openAddMode, selectIsModalOpen } from "@/lib/features/portfolio/transactionSlice";
import type { Portfolio, SelectedPortfolio } from "../type";

type PortfolioSummaryProps = {
  selectedPortfolio: SelectedPortfolio;
  portfolios: Portfolio[];
  portfolioId: string | string[] | null;
};

const PortfolioSummary = ({ selectedPortfolio, portfolios, portfolioId }: PortfolioSummaryProps) => {
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();
  // const [page, setPage] = useState(1);
  const { t } = useTranslate();

  const currentPortfolio = portfolios.find((portfolio) => portfolio.id === portfolioId);
  const isOverviewTab = !portfolioId;
  const handleAddTransactionClick = () => {
    dispatch(openAddMode());
  };
  // const handleLoadMoreCoins = (newPage: any) => {
  //   setPage(newPage);
  // };
  return (
    <>
      <Stack px={{ xs: 3, md: 4 }} pt={{ xs: 3, md: 4 }} pb={4}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ xs: undefined, md: "center" }} spacing={2}>
          {isOverviewTab ? (
            <Stack direction={"row"} spacing={1}>
              <Icon name="More-rectangle" />
              <Typography variant="p2-semi-bold" whiteSpace={"nowrap"}>
                Overview
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
          {!isOverviewTab && (
            <Button
              onClick={handleAddTransactionClick}
              startIcon={<Icon name="Plus" />}
              sx={{ ml: { xs: undefined, md: "auto" } }}
            >
              {t("portfolioSummary.addTransaction")}
            </Button>
          )}
        </Stack>
      </Stack>
      {isModalOpen && (
        <TransactionModal
        // totalCount={coins?.meta?.total_count!}
        // onPageChange={handleLoadMoreCoins}
        // page={page}
        />
      )}
    </>
  );
};

export default PortfolioSummary;
