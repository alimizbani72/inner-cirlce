"use client";

import { Paper, Stack, Typography, TableSortLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect, type ReactNode } from "react";
import Scrollbar from "../Scrollbar";
import _ from "lodash";
import type React from "react";

type ColumnType = {
  title: string;
  key: string;
  modify: (item: any) => ReactNode;
  sortType?: "sn" | "sa" | "sd";
  prefix?: string;
  suffix?: string;
};

type PropType = {
  title?: React.ReactNode;
  data: any[];
  action?: ReactNode;
  width?: any;
  minWidthCell?: any;
};

const generateColumns = (data: any[]) => {
  if (data.length === 0) {
    return [];
  }
  return Object.keys(data[0]).map((key) => {
    const match = key.match(/(.*?)(\[(.*)\])?$/);
    const title = match ? match[1].trim() : key;
    const modifiers = match && match[3] ? match[3].split("-") : [];

    const column: ColumnType = {
      title,
      key,
      modify: (item: any) => {
        let value = item[key];
        if (column.prefix) {
          value = column.prefix + value;
        }
        if (column.suffix) {
          value += column.suffix;
        }
        return value;
      },
    };

    modifiers.forEach((modifier) => {
      if (modifier.startsWith("pf=")) {
        column.prefix = modifier.slice(3);
      } else if (modifier.startsWith("sf=")) {
        column.suffix = modifier.slice(3);
      } else if (["sn", "sa", "sd"].includes(modifier)) {
        (column as any).sortType = modifier;
      }
    });

    return column;
  });
};

const SortTable = ({ title, data, action, width, minWidthCell }: PropType) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      const sortType = columns.find((col) => col.key === key)?.sortType;

      let sorted = [...data];
      if (sortType === "sn") {
        sorted = _.orderBy(sorted, [(item) => parseFloat(item[key])], [direction]);
      } else if (sortType === "sd") {
        sorted = _.orderBy(sorted, [(item) => new Date(item[key]).getTime()], [direction]);
      } else if (sortType === "sa") {
        sorted = _.orderBy(sorted, [(item) => item[key]?.toString().toLowerCase()], [direction]);
      }

      setSortedData(sorted);
    } else {
      setSortedData(data);
    }
  }, [sortConfig, data]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const columns = generateColumns(data);

  return (
    <Stack
      sx={{
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: "dark.3",
        bgcolor: "dark.2",
        width: width ?? "100%",
        overflow: "hidden",
      }}
    >
      {(title || action) && (
        <Stack direction="row" width={"100%"} justifyContent={"space-between"} p={3} pb={2}>
          {title && <Typography variant="p1-semi-bold">{title}</Typography>}
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
        <Scrollbar options={{ scrollbars: { autoHide: "leave" } }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell align="left" key={column.key}>
                    {column.sortType ? (
                      <TableSortLabel
                        active={sortConfig?.key === column.key}
                        direction={sortConfig?.direction}
                        onClick={() => handleSort(column.key)}
                      >
                        {column.title}
                      </TableSortLabel>
                    ) : (
                      column.title
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((rowItem) => (
                <TableRow key={rowItem.id}>
                  {columns.map((column, index) => (
                    <TableCell align="left" key={index}>
                      {column.modify(rowItem)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Stack>
  );
};

export default SortTable;
