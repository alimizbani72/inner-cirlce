import { usePortfolioServicePortfolioTransactionsQuery } from "@minecraft/queries";
import { Collapse, Divider, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import type { FC } from "react";
import TransactionsTable from "./TransactionsTable";
import { useTranslate } from "@/locales";
import { getActivePortfolioId } from "../../_section/utils";

type TransCollapseProps = {
  slug: string;
  colSpan: number;
  isClose: boolean;
};

const TransCollapse: FC<TransCollapseProps> = ({ slug, colSpan, isClose }) => {
  const { t } = useTranslate();
  const { portfolioId } = useParams();

  const { data: transactions, isLoading: transactionsLoading } = usePortfolioServicePortfolioTransactionsQuery(
    {
      opts: JSON.stringify({
        filters: {
          slug,
          portfolio_id: getActivePortfolioId(portfolioId),
        },
        page: 1,
        per_page: 20,
      }),
    },
    undefined,
    { enabled: !isClose }
  );

  return (
    <TableRow sx={{ height: isClose ? "0px !important" : "inherit" }}>
      <TableCell colSpan={colSpan} sx={{ py: "0 !important" }}>
        <Collapse in={!isClose} timeout="auto" unmountOnExit>
          <Stack direction={"row"} spacing={2}>
            {transactionsLoading ? (
              // <Loading />
              <Typography textAlign={"center"} variant="p1-semi-bold" color="white">
                On Loading...
              </Typography>
            ) : (
              <>
                <Divider
                  flexItem
                  orientation="vertical"
                  sx={{
                    width: "3px",
                    bgcolor: "#626583",
                    mb: 2,
                    ml: 5,
                  }}
                />
                <Stack>
                  <Typography variant="p2-semi-bold" color={"grey.light"} textTransform={"uppercase"}>
                    {t("assetsTable.transactions")}
                  </Typography>
                  <TransactionsTable transactions={transactions?.data || []} />
                </Stack>
              </>
            )}
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default TransCollapse;
