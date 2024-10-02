"use client";

import Empty from "@/components/Empty";
import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import Loading from "@/components/Loading";
import Scrollbar from "@/components/Scrollbar";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Fragment, useState, type ReactNode } from "react";
import type React from "react";
import TransactionsTable from "./TransactionsTable";
import numeral from "numeral";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";

type DataItem = {
  [key: string]: string;
};
const calculateTotal = (data: DataItem[], field: keyof DataItem): number => {
  return data.reduce((total, rowItem) => {
    const value = parseFloat(rowItem[field]?.replace(/[$,]/g, "")) || 0;
    return total + value;
  }, 0);
};

type Column = {
  title: string | ((item: any) => React.ReactNode);
  modify: (item: any) => React.ReactNode;
  field?: string;
};
type PropType = {
  totalCount?: number;
  page?: number;
  title?: React.ReactNode;
  columns: Column[];
  data: any[];
  width?: any;
  minWidthCell?: any;
  action?: ReactNode;
  leftIcon?: iconsType;
  isPending?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  onTableClick?: (id: string) => void;
  hasTitle?: boolean;
};

const CustomAssetTable = ({
  title,
  columns,
  data,
  width,
  minWidthCell,
  leftIcon,
  action,
  isPending,
  onTableClick,
  emptyTitle,
  emptySubtitle,
  hasTitle = true,
}: PropType) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const handleToggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totals = {
    actualValue: calculateTotal(data, "actualValue"),
    totalSold: calculateTotal(data, "totalSold"),
    totalInvest: calculateTotal(data, "totalInvest"),
    totalRealized: calculateTotal(data, "totalRealized"),
    profit: calculateTotal(data, "profit"),
  };

  const renderTotalRow = (item: any, index: number, totals: Record<string, number>) => {
    const field = item.field;
    const totalValue = totals[field];
    const colorFullFields = ["profit", "actualValue"];
    const color = colorFullFields.includes(field) ? (totalValue < 0 ? "error.main" : "success.main") : "white";

    if (field === "name") {
      return (
        <TableCell key={index}>
          <Stack width={"100%"} pl={1} pb={3}>
            <Typography variant="p2-medium" color={"grey.light"} textTransform={"uppercase"}>
              {isMobile ? t("assetsTable.total") : t("assetsTable.assetsTotalValue")}
            </Typography>
          </Stack>
        </TableCell>
      );
    }

    if (totalValue !== undefined) {
      return (
        <TableCell key={index}>
          <Stack width={"100%"} pb={3}>
            <Typography variant="p2-medium" color={color}>
              {numeral(totalValue).format("0,0.00")}
            </Typography>
          </Stack>
        </TableCell>
      );
    }
    return <TableCell key={index} />;
  };

  return (
    <Stack
      sx={{
        borderRadius: hasTitle ? 2 : 0,
        border: "1.5px solid",
        borderColor: "dark.3",
        bgcolor: "dark.2",
        width: width ?? "100%",
        overflow: "hidden",
      }}
    >
      {hasTitle && (
        <Stack direction="row" width={"100%"} justifyContent={"space-between"} p={3} pb={2}>
          <Stack direction={"row"} spacing={1}>
            {!!leftIcon && <Icon name={leftIcon} />}
            <Typography variant="p1-semi-bold">{title}</Typography>
          </Stack>

          {action && action}
        </Stack>
      )}
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "dark.2",
          borderRadius: 0,
          ".MuiTableCell-head": {
            borderBottom: "none",
            bgcolor: "dark.3",
            typography: "caption-medium",
            textTransform: "uppercase",
            color: "grey.light",
            p: 0,
            py: 1,
            "&:first-of-type": { pl: 3 },
            "&:last-of-type": { pr: 3 },
            "&:not(:last-of-type)": { pr: "14px" },
          },
          ".MuiTableCell-root:not(.MuiTableCell-head)": {
            minWidth: minWidthCell ?? 150,
            typography: "p2-medium",
            color: "white",
            textAlign: "start",
            p: 0,
            py: 2,
            borderBottomStyle: "solid",
            borderColor: "dark.3",
            borderWidth: "1.5px",
            "&:first-of-type": { pl: 3 },
            "&:last-of-type": { pr: 3 },
            "&:not(:last-of-type)": { pr: "14px" },
          },
          ".MuiTableRow-head": { height: 40 },
          ".MuiTableRow-root:not(.MuiTableRow-head)": { height: 56 },
        }}
      >
        {isPending ? (
          <Loading />
        ) : (
          <>
            {!data?.length ? (
              <Empty title={emptyTitle} subtitle={emptySubtitle} />
            ) : (
              <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
                <Table aria-label="customized table" sx={{ px: "0 !important" }}>
                  <TableHead>
                    <TableRow>
                      {columns.map((head, index) => (
                        <TableCell align="left" key={index} sx={{ whiteSpace: "nowrap" }}>
                          {typeof head.title === "string" ? head.title : head.title(data)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.length > 0 &&
                      !isPending &&
                      data?.map((rowItem) => (
                        <Fragment key={rowItem.id}>
                          <TableRow
                            onClick={() => onTableClick && onTableClick(rowItem.id)}
                            sx={{ cursor: onTableClick ? "pointer" : "default", px: "30px !important" }}
                          >
                            {columns.map((item, index) => (
                              <TableCell
                                align="left"
                                key={index}
                                sx={{ borderBottom: expandedRows[rowItem.id] ? "none !important" : undefined }}
                              >
                                {item.field === "name" ? (
                                  <Stack direction={"row"} alignItems={"center"}>
                                    {item.modify(rowItem)}
                                    <Stack
                                      flex={1}
                                      onClick={() => handleToggleExpand(rowItem.id)}
                                      sx={{ cursor: "pointer" }}
                                    >
                                      <img
                                        src={
                                          expandedRows[rowItem.id]
                                            ? "/assets/svg/arrowup.svg"
                                            : "/assets/svg/arrowdown.svg"
                                        }
                                        width={24}
                                        height={24}
                                      />
                                    </Stack>
                                  </Stack>
                                ) : (
                                  item.modify(rowItem)
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                          {expandedRows[rowItem.id] && rowItem.transactions.length > 0 && (
                            <TableRow>
                              <TableCell colSpan={columns.length} sx={{ py: "0 !important" }}>
                                <Stack direction={"row"} spacing={2}>
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
                                    <TransactionsTable transactions={rowItem.transactions} />
                                  </Stack>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          )}
                        </Fragment>
                      ))}
                    <TableRow>{columns.map((item, index) => renderTotalRow(item, index, totals))}</TableRow>
                  </TableBody>
                </Table>
              </Scrollbar>
            )}
          </>
        )}
      </TableContainer>
    </Stack>
  );
};

export default CustomAssetTable;
