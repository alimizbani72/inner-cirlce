"use client";

import { Divider, Pagination, Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type React from "react";
import type { ReactNode } from "react";
import { Fragment, useState } from "react";
import Empty from "./Empty";
import Loading from "./Loading";
import { Icon } from "./icons";

const levelColorLine = {
  0: "#090A23",
  1: "#565CE4",
  2: "#FF7DBC",
};

export type SortType = Record<string, Boolean | undefined>;

type PropType = {
  totalCount?: number;
  page?: number;
  perPage?: number;
  handleChangePage?: (_event: React.ChangeEvent<unknown>, newPage: number) => void;
  title?: ReactNode;
  columns: { title: string; modify: (item: any) => ReactNode; sortable?: boolean; fieldName?: string }[];
  data: any[];
  width?: any;
  minWidthCell?: any;
  action?: ReactNode;
  mobileAction?: ReactNode;
  emptyTitle?: string;
  emptySubtitle?: string;
  isPending?: boolean;
  sort?: SortType;
  onSortChange?: (value?: SortType) => void;
  onRowClick?: (row: any) => void;
  containerHeight?: any;
};

const CustomTable = ({
  page = 1,
  perPage,
  handleChangePage,
  totalCount = 10,
  title,
  columns,
  data,
  width,
  minWidthCell,
  action,
  emptyTitle,
  emptySubtitle,
  isPending,
  mobileAction,
  onSortChange,
  sort,
  onRowClick,
  containerHeight,
}: PropType) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const handleToggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSortChange = (fieldName: string) => {
    if (sort && Object.keys(sort)?.[0] === fieldName) {
      onSortChange?.(sort[fieldName] ? { [fieldName]: false } : undefined); // set (desc or undefined)
    } else {
      onSortChange?.({ [fieldName]: true }); //set asc
    }
  };

  const renderRows = (rows: any[], level: number = 0) => {
    return rows.map((row) => (
      <Fragment key={row.id}>
        <TableRow
          sx={(_theme) => ({
            "&.MuiTableRow-root": {
              borderLeft: `${level ? 2 : 1}px solid`,
              borderColor: levelColorLine[level as keyof typeof levelColorLine],
            },
          })}
          onClick={() => onRowClick?.(row)}
        >
          {columns.map((item, index) => (
            <TableCell align="left" key={index}>
              {item.modify(row)}
            </TableCell>
          ))}
          {row.children && row.children.length > 0 && (
            <TableCell align="right">
              <Stack
                direction={"row"}
                gap={0.5}
                onClick={() => handleToggleExpand(row.id)}
                justifyContent={"flex-end"}
                alignItems={"center"}
                sx={{
                  path: {
                    stroke: (theme) => (expandedRows[row.id] ? theme.palette.common.white : theme.palette.grey.light),
                  },
                }}
              >
                <Typography variant="caption-regular" color={expandedRows[row.id] ? "common.white" : "grey.light"}>
                  {level + 1}
                </Typography>
                <Icon name={expandedRows[row.id] ? "Arrow-up" : "Arrow-down"} />
              </Stack>
            </TableCell>
          )}
        </TableRow>
        {expandedRows[row.id] && row.children && renderRows(row.children, level + 1)}
      </Fragment>
    ));
  };

  return (
    <Stack
      sx={{
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: "dark.3",
        bgcolor: "dark.2",
        width: width ?? "100%",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {(title || action) && (
        <>
          <Stack direction="row" width={"100%"} alignItems={"center"} justifyContent={"space-between"} p={3} pb={2}>
            {title && <Typography variant="p1-semi-bold">{title}</Typography>}

            {action && action}
          </Stack>
          {!!mobileAction && (
            <Stack px={3} pb={3} display={{ xs: "flex", md: "none" }}>
              {" "}
              {mobileAction}
            </Stack>
          )}
        </>
      )}
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "dark.2",
          borderRadius: 0,
          maxHeight: containerHeight || {
            xs: `calc(100dvh - ${totalCount > 10 ? 258 : 200}px)`,
            md: `calc(100dvh - ${totalCount > 10 ? 202 : 147}px)`,
          },
          "& .MuiTableCell-head": {
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
        <Table
          aria-label="customized table"
          sx={{
            height: "100%",
          }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {columns.map((head) => (
                <TableCell align="left" key={head.title}>
                  {head?.sortable && head?.fieldName ? (
                    <Stack
                      direction="row"
                      alignItems="center"
                      onClick={() => handleSortChange(head?.fieldName || "")}
                      sx={(theme) => ({
                        cursor: "pointer",
                        "& svg > path": {
                          "&:first-child": {
                            stroke: sort?.[head?.fieldName || ""]
                              ? theme.palette.common.white
                              : theme.palette.grey.light,
                          },
                          "&:last-child": {
                            stroke:
                              sort?.[head?.fieldName || ""] === false
                                ? theme.palette.common.white
                                : theme.palette.grey.light,
                          },
                        },
                      })}
                    >
                      {head.title} {head?.sortable && <Icon name="Arrow-Sort" />}
                    </Stack>
                  ) : (
                    head.title
                  )}
                </TableCell>
              ))}
              {data.some((item) => item.children && item.children.length > 0) && <TableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length ? (
              renderRows(data)
            ) : (
              <TableRow>
                <TableCell colSpan={columns?.length}>
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    width={{ xs: "calc(100vw - 52px)!important", md: "100% !important" }}
                  >
                    {isPending ? <Loading /> : <Empty title={emptyTitle} subtitle={emptySubtitle} />}
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalCount > 10 && (
        <>
          <Divider flexItem orientation="horizontal" />
          <Stack direction={"row"} justifyContent={"center"} py={1.5}>
            <Pagination
              count={Math.ceil(totalCount / (perPage || 10))}
              defaultPage={1}
              page={page}
              onChange={handleChangePage}
              siblingCount={0}
              boundaryCount={2}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CustomTable;
