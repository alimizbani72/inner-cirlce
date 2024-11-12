"use client";
import { Divider, Stack, Table, TableBody } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import TransactionDetail from "./TransactionDetail";
import numeral from "numeral";
import { useTranslate } from "@/locales";
import Bullets from "../../_section/Bullets";
import MoreTransactionAction from "./MoreTransactionAction";
import { useParams } from "next/navigation";
import { formatPrice, getActivePortfolioId } from "../../_section/utils";

type Props = {
  symbol: string;
  logo: string;
  name: string;
  transactions: any[];
};
const TransactionsTable = ({ transactions, symbol, logo, name }: Props) => {
  const { portfolioId } = useParams();
  const hasPortfolioId = getActivePortfolioId(portfolioId);
  const { t } = useTranslate();
  return (
    <Table>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell sx={{ pl: "0 !important" }}>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                {hasPortfolioId && <MoreTransactionAction transaction={{ ...transaction, logo, symbol, name }} />}
                <Divider flexItem orientation="vertical" />
                <Bullets bgcolor={transaction.type === "buy" ? "success.main" : "danger.main"} />
                <TransactionDetail label={t("assetsTable.quantity")} value={formatPrice(transaction.quantity)} />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail
                  label={t("assetsTable.pricePerCoin")}
                  hascurrency
                  value={formatPrice(transaction.price)}
                />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail
                  label={t("assetsTable.fee")}
                  hascurrency
                  value={numeral(transaction.fee).format("0,0.00")}
                />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail label={t("assetsTable.dateAndTime")} value={transaction.date} />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail label={t("assetsTable.note")} value={transaction.note || "--"} />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TransactionsTable;
