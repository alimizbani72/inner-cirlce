"use client";
import { useTranslate } from "@/locales";
import { customInstance } from "@/scripts/fetcher";
import {
  Collapse,
  Divider,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import type { FC } from "react";
import { getActivePortfolioId } from "../../_section/utils";
import TransactionsTable from "./TransactionsTable";
type UseGetPortfolioTransactionsParams = {
  opts: string;
};

export const useGetPortfolioTransactions = (
  params: UseGetPortfolioTransactionsParams,
  options?: { query?: any },
) => {
  return useQuery({
    queryKey: ["portfolio-transactions", params.opts],
    queryFn: async () => {
      return await customInstance<any>({
        url: "/portfolio/transactions",
      });
    },
    ...options?.query,
  });
};

type TransCollapseProps = {
  slug: string;
  colSpan: number;
  isClose: boolean;
  symbol: string;
  logo: string;
  name: string;
};

const TransCollapse: FC<TransCollapseProps> = ({
  slug,
  colSpan,
  isClose,
  symbol,
  name,
  logo,
}) => {
  const { t } = useTranslate();
  const { portfolioId } = useParams();

  const { data: transactions, isLoading: transactionsLoading } =
    useGetPortfolioTransactions(
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
      {
        query: {
          enabled: !isClose,
        },
      },
    );

  return (
    <TableRow sx={{ height: isClose ? "0px !important" : "inherit" }}>
      <TableCell colSpan={colSpan} sx={{ py: "0 !important" }}>
        <Collapse in={!isClose} timeout="auto" unmountOnExit>
          <Stack direction={"row"} spacing={2}>
            {transactionsLoading ? (
              // <Loading />
              <Typography
                textAlign={"center"}
                variant="p1-semi-bold"
                color="white"
              >
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
                  <Typography
                    variant="p2-semi-bold"
                    color={"grey.light"}
                    textTransform={"uppercase"}
                  >
                    {t("assetsTable.transactions")}
                  </Typography>
                  <TransactionsTable
                    transactions={transactions?.data || []}
                    logo={logo}
                    symbol={symbol}
                    name={name}
                  />
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
