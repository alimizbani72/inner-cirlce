"use client";

import { Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { ReactNode } from "react";
import Scrollbar from "./Scrollbar";
import type React from "react";

type PropType = {
  title?: React.ReactNode;
  columns: { title: string; modify: (item: any) => ReactNode }[];
  data: any[];
  width?: any;
  minWidthCell?: any;
};

const CustomTable = ({ title, columns, data, width, minWidthCell }: PropType) => {
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
      {title && (
        <Typography variant="p1-semi-bold" p={3} pb={2}>
          {title}
        </Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((rowItem) => (
                <TableRow key={rowItem.id}>
                  {columns.map((item, index) => (
                    <TableCell align="left" key={index}>
                      {item.modify(rowItem)}
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

export default CustomTable;
