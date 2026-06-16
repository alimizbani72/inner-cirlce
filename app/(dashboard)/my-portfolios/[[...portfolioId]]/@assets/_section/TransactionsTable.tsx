"use client";
import { useTranslate } from "@/locales";
import {
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useParams } from "next/navigation";
import numeral from "numeral";
import Bullets from "../../_section/Bullets";
import { formatPrice, getActivePortfolioId } from "../../_section/utils";
import MoreTransactionAction from "./MoreTransactionAction";
import TransactionDetail from "./TransactionDetail";

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
                {hasPortfolioId && (
                  <MoreTransactionAction
                    transaction={{ ...transaction, logo, symbol, name }}
                  />
                )}
                <Divider flexItem orientation="vertical" />
                <Bullets
                  bgcolor={
                    transaction.type === "buy" ? "success.main" : "danger.main"
                  }
                />
                <TransactionDetail
                  label={t("assetsTable.quantity")}
                  value={formatPrice(transaction.quantity)}
                />
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
                <TransactionDetail
                  label={t("assetsTable.dateAndTime")}
                  value={transaction.date}
                />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail
                  label={t("assetsTable.note")}
                  value={transaction.note || "--"}
                />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TransactionsTable;
