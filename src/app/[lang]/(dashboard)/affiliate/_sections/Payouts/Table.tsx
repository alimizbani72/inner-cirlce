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
    title: "Name",
    modify: (row: any) => row.title,
  },
  {
    title: "Evaluation",
    modify: (row: any) => row.evaluation,
  },
  {
    title: "Category",
    modify: (row: any) => row.category,
  },
];

const data = [
  {
    id: 1,
    title: "Bitcoin",
    evaluation: "9,01",
    category: "Store of Value",
  },
  {
    id: 2,
    title: "Ethereum",
    evaluation: "8,65",
    category: "Layer 1",
  },
  {
    id: 3,
    title: "Solana",
    evaluation: "8,57",
    category: "Layer 1",
  },
];

const AffPayoutsTabTable: FC = () => {
  const filterPopover = usePopover();
  const [dates, setDates] = useState<any>([]);

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
            title="Commissions"
            columns={columns}
            data={data}
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
