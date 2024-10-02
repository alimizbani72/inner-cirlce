"use client";
import { Divider, Stack, Table, TableBody } from "@mui/material";
import { TableCell, TableRow } from "@mui/material";
import TransactionDetail from "./TransactionDetail";
import { Icon } from "@/components/icons";
import numeral from "numeral";
import { useTranslate } from "@/locales";

const TransactionsTable = ({ transactions }: { transactions: any[] }) => {
  const { t } = useTranslate();
  return (
    <Table>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell sx={{ pl: "0 !important" }}>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Icon name="More" />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail
                  label={t("assetsTable.quantity")}
                  value={`$${numeral(transaction.quantity).format("0,0.00")}`}
                />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail
                  label={t("assetsTable.pricePerCoin")}
                  value={`$${numeral(transaction.pricePerCoin).format("0,0.00")}`}
                />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail
                  label={t("assetsTable.fee")}
                  value={`$${numeral(transaction.fee).format("0,0.00")}`}
                />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail label={t("assetsTable.dateAndTime")} value={transaction.dateTime} />
                <Divider flexItem orientation="vertical" />
                <TransactionDetail label={t("assetsTable.note")} value={transaction.note ?? "--"} />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TransactionsTable;
