"use client";

import Empty from "@/components/Empty";
import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import Loading from "@/components/Loading";
import Scrollbar from "@/components/Scrollbar";
import { Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Fragment, useMemo, useState, type ReactNode } from "react";
import type React from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setActiveSymbol } from "@/lib/features/portfolio/transactionSlice";
import TransCollapse from "./TransCollapse";
import TotalRow from "./TotalRow";
import { calculateTotal } from "../../_section/utils";

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
  const dispatch = useAppDispatch();
  const handleToggleExpand = (symbol: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [symbol]: !prev[symbol],
    }));

    if (!expandedRows[symbol]) {
      dispatch(setActiveSymbol(symbol));
    }
  };

  const totals = useMemo(
    () => ({
      actual_value: calculateTotal(data, "actual_value"),
      total_sold: calculateTotal(data, "total_sold"),
      total_invested: calculateTotal(data, "total_invested"),
      realized_pnl: calculateTotal(data, "realized_pnl"),
      unrealized_pnl: calculateTotal(data, "unrealized_pnl"),
    }),
    [data]
  );

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
                    {data?.map((rowItem) => (
                      <Fragment key={rowItem.symbol}>
                        <TableRow
                          onClick={() => onTableClick && onTableClick(rowItem.id)}
                          sx={{ cursor: onTableClick ? "pointer" : "default", px: "30px !important" }}
                        >
                          {columns.map((item, index) => (
                            <TableCell
                              align="left"
                              key={index}
                              sx={{ borderBottom: expandedRows[rowItem.symbol] ? "none !important" : undefined }}
                            >
                              {item.field === "name"
                                ? item.modify({
                                    row: rowItem,
                                    onClick: () => handleToggleExpand(rowItem.symbol),
                                    isOpen: expandedRows[rowItem.symbol],
                                  })
                                : item.modify(rowItem)}
                            </TableCell>
                          ))}
                        </TableRow>

                        <TransCollapse
                          symbol={rowItem.symbol}
                          colSpan={columns.length}
                          isClose={!expandedRows[rowItem.symbol]}
                        />
                      </Fragment>
                    ))}
                    <TableRow>
                      {columns.map((item, index) => (
                        <TotalRow key={index} item={item} index={index} totals={totals} />
                      ))}
                    </TableRow>
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
