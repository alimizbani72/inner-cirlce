"use client";

import { Fragment, useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { ReactNode } from "react";
import Scrollbar from "./Scrollbar";
import { Icon } from "./icons";

const levelColorLine = {
  0: "#090A23",
  1: "#565CE4",
  2: "#FF7DBC",
};

type PropType = {
  title?: ReactNode;
  columns: { title: string; modify: (item: any) => ReactNode }[];
  data: any[];
  width?: any;
  minWidthCell?: any;
  action?: ReactNode;
};

const CustomTable = ({ title, columns, data, width, minWidthCell, action }: PropType) => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const handleToggleExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderRows = (rows: any[], level: number = 0) => {
    return rows.map((row) => (
      <Fragment key={row.id}>
        <TableRow
          sx={(_theme) => ({
            "&.MuiTableRow-root": {
              borderLeft: `${level ? 2 : 1}px solid`,
              // borderColor: level ? theme.palette.blue.dark : "default",
              borderColor: levelColorLine[level as keyof typeof levelColorLine],
            },
          })}
        >
          {columns.map((item, index) => (
            <TableCell align="left" key={index}>
              {item.modify(row)}
            </TableCell>
          ))}
          <TableCell align="right">
            {row.children && row.children.length > 0 && (
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
            )}
          </TableCell>
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
                {columns.map((head) => (
                  <TableCell align="left" key={head.title}>
                    {head.title}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>{renderRows(data)}</TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Stack>
  );
};

export default CustomTable;
