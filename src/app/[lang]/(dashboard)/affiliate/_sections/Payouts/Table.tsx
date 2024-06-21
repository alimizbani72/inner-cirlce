"use client";

import { useCallback, useState, type FC } from "react";
import type React from "react";

import { Box, Stack, Typography } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { Icon } from "@/components/icons";
import { DatePicker } from "@mui/x-date-pickers";
import { fDate } from "@/utils/format-time";
import { useFinancialServiceFinancialPayoutsQuery } from "@minecraft/queries";
import type { PayoutResponse } from "@/services/requests";
import { formatCurrency } from "@/utils/toNumber";

const datePickerStyle = {
  ".MuiIconButton-root": {
    color: "white",
    mr: 0,
  },
};

const slotProps = {
  calendarHeader: {
    sx: { ".MuiPickersCalendarHeader-label": { color: "white" } },
    slotProps: {
      switchViewButton: { sx: { color: "white" } },
      previousIconButton: { sx: { color: "white" } },
      nextIconButton: { sx: { color: "white" } },
    },
  },
  desktopPaper: {
    sx: {
      ".MuiPickersYear-yearButton": { color: "white" },
      backgroundColor: "dark.2",
      boxShadow: "0px 24px 64px 0px rgba(0, 0, 0, 0.24)",
      border: "1px solid",
      borderColor: "dark.3",
    },
  },

  day: {
    sx: {
      color: "white",
      typography: "p2-medium",

      "&.MuiPickersDay-today": {
        bgcolor: "white",
        color: "dark.1",
      },
    },
  },
};

const columns = [
  {
    title: "User ID",
    modify: (row: PayoutResponse) => row.user_id,
  },
  {
    title: "Wallet ID",
    modify: (row: PayoutResponse) => row.wallet_id,
  },
  {
    title: "Amount",
    modify: (row: PayoutResponse) => formatCurrency(row.amount),
  },
  {
    title: "Date",
    modify: (row: PayoutResponse) => fDate((row as any).created_at, "dd.MM.yyyy"),
  },
  {
    title: "Status",
    modify: (row: PayoutResponse) => (row as any).status,
  },
];

const AffPayoutsTabTable: FC = () => {
  const filterPopover = usePopover();
  const [dates, setDates] = useState<any>([]);
  const filter = {
    filters: {
      ...(dates?.[0] && { from_created_at: fDate(dates?.[0], "yyyy-MM-dd") }),
      ...(dates?.[1] && { to_created_at: fDate(dates?.[1], "yyyy-MM-dd") }),
    },
    sorts: { created_at: false },
    per_page: 10000,
  };
  const { data, isPending } = useFinancialServiceFinancialPayoutsQuery(
    dates.length && { opts: JSON.stringify(filter) }
  );

  const handleOpenFilter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      filterPopover.onOpen(event);
    },
    [filterPopover]
  );

  const handleCloseFilter = useCallback(() => {
    filterPopover.onClose();
  }, [filterPopover]);

  return (
    <Stack>
      <Scrollbar>
        <Stack
          alignItems="flex-start"
          maxWidth={{ md: "calc(100vw - 64px)", xs: "calc(100vw - 48px)" }}
          sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          <CustomTable
            title="Payouts"
            columns={columns}
            data={data?.data || []}
            isPending={isPending}
            emptyTitle="You have not any payouts yet"
            emptySubtitle="Track profits, losses and valuation all in one place."
            action={
              <Box>
                <Stack direction="row" gap={0.5} onClick={handleOpenFilter} sx={{ cursor: "pointer" }}>
                  <Typography variant="p2-semi-bold">
                    {dates.length
                      ? `From ${fDate(dates?.[0], "dd.MM.yyyy") || "-"} To ${fDate(dates?.[1], "dd.MM.yyyy") || "-"}`
                      : "Date & Time"}
                  </Typography>
                  <Icon name={filterPopover.open ? "Arrow-up" : "Arrow-down"} />
                </Stack>

                <CustomPopover
                  open={filterPopover.open}
                  onClose={handleCloseFilter}
                  sx={{
                    m: 0,
                    p: 3,
                    border: "1px solid",
                    borderRadius: 2,
                    borderColor: "dark.3",
                    backgroundColor: "dark.2",
                    boxShadow: "0px 24px 64px 0px rgba(0, 0, 0, 0.24)",
                    backdropFilter: "none",
                    backgroundImage: "none",
                    "> span:first-of-type": {
                      display: "none",
                    },
                  }}
                >
                  <Stack gap={2}>
                    <Stack gap={2}>
                      <Typography variant="caption-semi-bold">FROM</Typography>

                      <DatePicker
                        format="dd.MM.yyyy"
                        value={dates?.[0] || null}
                        slotProps={slotProps}
                        sx={datePickerStyle}
                        onChange={(value) => {
                          setDates((state: any) => [value, state?.[1]]);
                        }}
                      />
                    </Stack>

                    <Stack gap={2}>
                      <Typography variant="caption-semi-bold">TO</Typography>

                      <DatePicker
                        format="dd.MM.yyyy"
                        slotProps={slotProps}
                        value={dates?.[1] || null}
                        sx={datePickerStyle}
                        onChange={(value) => {
                          setDates((state: any) => [state?.[0], value]);
                        }}
                      />
                    </Stack>
                  </Stack>
                </CustomPopover>
              </Box>
            }
          />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AffPayoutsTabTable;
