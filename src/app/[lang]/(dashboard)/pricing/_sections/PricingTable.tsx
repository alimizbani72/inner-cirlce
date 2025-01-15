"use client";

import { Icon } from "@/components/icons";
import RiveComp from "@/components/RiveComp";
import { plans } from "@/configs/plans";
import { useIsMobile } from "@/hooks/use-responsive";
import type { Plan } from "@/lib/features/plans/plansSlice";
import { fCurrency } from "@/utils/format-number";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody, { tableBodyClasses } from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead, { tableHeadClasses } from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { FC } from "react";

export type SortType = Record<string, Boolean | undefined>;

type Props = {
  plansData: Plan[];
  rows: Record<string, Array<string | boolean>>;
  userType: string;
  handlePayment: (plan_type: string) => Promise<void>;
  isPending?: boolean;
};

const PricingTable: FC<Props> = ({ plansData, rows, userType, handlePayment, isPending }) => {
  const isMobile = useIsMobile();

  return (
    <Stack
      sx={(theme) => ({
        borderRadius: { xs: 0, md: 2 },
        bgcolor: "dark.2",
        width: "100%",
        overflow: "hidden",
        height: "100%",
        ...(isMobile && { borderLeft: "unset", borderRight: "unset" }),
        [`& .${tableHeadClasses.root} `]: {
          "& > tr > th:first-child": {
            position: "sticky",
            left: 0,
            top: 0,
            backgroundColor: theme.palette.dark[2],
            zIndex: 4,
          },
        },
        [`& .${tableBodyClasses.root} > tr`]: {
          borderLeft: "unset",
          "& > td:first-child": {
            position: "sticky",
            left: 0,
            backgroundColor: theme.palette.dark[1],
            zIndex: 3,
            paddingLeft: `${theme.spacing(1)} !important`,
          },
        },
      })}
    >
      <TableContainer
        component={Paper}
        sx={{
          bgcolor: "dark.2",
          borderRadius: 0,
          maxHeight: {
            xs: `calc(100dvh -  220px)`,
            md: `calc(100dvh -  170px)`,
          },
          "& .MuiTableCell-head": {
            bgcolor: "dark.2",
            typography: "p2-medium",
            textTransform: "uppercase",
            color: "grey.light",
            border: (theme) => `1px solid ${theme.palette.dark[3]} !important`,
          },
          ".MuiTableCell-root:not(.MuiTableCell-head)": {
            minWidth: 150,
            typography: "p2-medium",
            bgcolor: "dark.1",
            color: "white",
            p: 0,
            py: 2,
            border: (theme) => `1px solid ${theme.palette.dark[3]}`,
            px: 1,
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
              <TableCell sx={{ borderTopLeftRadius: 16, minWidth: 156 }}>plan</TableCell>
              {plansData?.map((head) => (
                <TableCell align="left" key={head.title} sx={{ textAlign: "center !important" }}>
                  {head.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(rows)?.map(([key, values]) => (
              <TableRow>
                <TableCell align="left" key={key}>
                  {key}
                </TableCell>
                {values?.map((item, index) => (
                  <TableCell align="left" key={index} sx={{ textAlign: "center !important", minWidth: 156 }}>
                    <Box>
                      {typeof item === "boolean" ? (
                        <Box
                          component={Icon}
                          name={item ? "Check" : "Close"}
                          sx={{
                            path: {
                              stroke: (theme) => (item ? theme.palette.success.main : theme.palette.danger.main),
                            },
                          }}
                        />
                      ) : key?.includes("Gold") ? (
                        <Stack direction="row" alignItems="center" justifyContent="center" position={"relative"}>
                          <RiveComp src="/assets/rive/coin_rotation_2.riv" width={40} height={40} />
                          <Typography variant="p2-medium">{item || 0}</Typography>
                        </Stack>
                      ) : (
                        <Typography variant="p2-medium">{item}</Typography>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                sx={{
                  borderBottomLeftRadius: 16,
                  bgcolor: (theme) => `${theme.palette.dark[2]} !important`,
                  minWidth: 156,
                }}
              >
                Price
              </TableCell>
              {plansData.map((plan, index) => (
                <TableCell
                  sx={{ textAlign: "center !important", bgcolor: (theme) => `${theme.palette.dark[2]} !important` }}
                  key={`price-${index}`}
                >
                  <Typography key={`${plan}-${index}`} sx={{ color: "blue.light" }}>
                    {fCurrency(plan.cost, "$0,0[.]00")}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "unset !important" }} />
              {plansData.map((plan, index) => (
                <TableCell
                  sx={{ textAlign: "center ", borderBottom: "unset !important" }}
                  key={`loadingButton-${index}`}
                >
                  <LoadingButton
                    loading={isPending}
                    onClick={() => handlePayment(plan?.title.toLowerCase())}
                    disabled={
                      plans[userType as keyof typeof plans].order >= plans[plan.plan_type as keyof typeof plans].order
                    }
                  >
                    {plan.buttonText}
                  </LoadingButton>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default PricingTable;
