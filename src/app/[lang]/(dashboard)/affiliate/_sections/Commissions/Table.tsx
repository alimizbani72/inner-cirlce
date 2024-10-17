"use client";

import type React from "react";
import { type ChangeEvent, useMemo, useState, type FC, useCallback } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import { useAffiliateServiceAffiliateCommissionListQuery } from "@minecraft/queries";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { fDate } from "@/utils/format-time";
import type { PayoutCommissionResponse, SampleListOpts } from "@minecraft/requests";
import { toTitleCase } from "@/utils/change-case";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import useToggleState from "@/hooks/use-toggle-state";
import CustomPopover, { usePopover } from "@/components/custom-popover";
import { DatePicker } from "@mui/x-date-pickers";
import DownLoadCommissionModal from "./DownLoadCommissionModal";
const datePickerStyle = {
  ".MuiIconButton-root": {
    color: "white",
    mr: 0,
  },
};

const slotProps = {
  switchViewButton: { sx: { color: "white" } },
  previousIconButton: { sx: { color: "white" } },
  nextIconButton: { sx: { color: "white" } },
  calendarHeader: { sx: { ".MuiPickersCalendarHeader-label": { color: "white" } } },
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
const AffCommissionsTabTable: FC = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const [open, toggle] = useToggleState();
  const columns = useMemo(
    () => [
      {
        title: t("affCommissionsTabTable.userID"),
        modify: (row: PayoutCommissionResponse) => row.user_id,
      },
      {
        title: t("affCommissionsTabTable.userEmail"),
        modify: (row: PayoutCommissionResponse) => (row as any).email,
      },
      {
        title: t("affCommissionsTabTable.amount"),
        modify: (row: PayoutCommissionResponse) => formatCurrency(row.amount),
      },
      {
        title: t("affCommissionsTabTable.packageName"),
        modify: (row: PayoutCommissionResponse) => toTitleCase(row.plan_type!),
      },
      {
        title: t("affCommissionsTabTable.percentage"),
        modify: (row: PayoutCommissionResponse) => toNumber(row.percent),
      },
      {
        title: t("affCommissionsTabTable.commissionDate"),
        modify: (row: PayoutCommissionResponse) => fDate(toNumber(row.created_at) * 1000, "dd.MM.yyyy"),
      },
    ],
    [t]
  );
  const filterPopover = usePopover();
  const [page, setpage] = useState(1);
  const [dates, setDates] = useState<any>([]);
  const filterOpts = {
    filters: {
      ...(dates?.[0] && { from_created_at: fDate(dates?.[0], "yyyy-MM-dd") }),
      ...(dates?.[1] && { to_created_at: fDate(dates?.[1], "yyyy-MM-dd") }),
    },
    sorts: { created_at: false },
    page: page,
    per_page: 10,
  };

  const { data: commissionList, isLoading } = useAffiliateServiceAffiliateCommissionListQuery({
    opts: JSON.stringify(filterOpts) as SampleListOpts,
  });

  const handleOpenFilter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      filterPopover.onOpen(event);
    },
    [filterPopover]
  );

  const handleCloseFilter = useCallback(() => {
    filterPopover.onClose();
  }, [filterPopover]);

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setpage(newPage as any);
  };
  return (
    <Stack>
      <Scrollbar>
        <Stack
          alignItems="flex-start"
          maxWidth={{ md: "calc(100vw - 64px)", xs: "calc(100vw - 48px)" }}
          sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          <CustomTable
            page={filterOpts.page}
            isPending={isLoading}
            handleChangePage={handleChangePage}
            totalCount={commissionList?.meta?.total_count}
            title={t("affCommissionsTabTable.commissionsTitle")}
            columns={columns}
            data={commissionList?.data || []}
            emptyTitle={t("affCommissionsTabTable.noRecord")}
            mobileAction={
              <Button
                startIcon={<Icon name="download" />}
                color={isMobile ? "primary" : "info"}
                sx={{ width: "100%" }}
                onClick={toggle}
              >
                {t("affPayoutsTabTable.dwonloadStatement")}
              </Button>
            }
            action={
              <Box>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  gap={2}
                  pl={isMobile ? 5 : undefined}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Box onClick={handleOpenFilter}>
                    <Typography variant="p2-semi-bold">
                      {dates.length
                        ? `${t("affPayoutsTabTable.from")} ${fDate(dates?.[0], "dd.MM.yyyy") || "-"} ${t(
                            "affPayoutsTabTable.to"
                          )} ${fDate(dates?.[1], "dd.MM.yyyy") || "-"}`
                        : t("affPayoutsTabTable.dateAndTime")}
                    </Typography>
                    <Icon name={filterPopover.open ? "Arrow-up" : "Arrow-down"} />
                  </Box>
                  <Stack>
                    <Button
                      startIcon={<Icon name="download" />}
                      color="info"
                      onClick={toggle}
                      sx={{ display: { md: "flex", xs: "none" } }}
                    >
                      {t("affPayoutsTabTable.dwonloadStatement")}
                    </Button>
                  </Stack>
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
                      <Typography variant="caption-semi-bold">{t("affPayoutsTabTable.from")}</Typography>

                      <DatePicker
                        format="dd.MM.yyyy"
                        value={dates?.[0] || null}
                        slotProps={slotProps}
                        sx={datePickerStyle}
                        onChange={(value) => {
                          setDates((state: any) => [value, state?.[1]]);
                        }}
                        desktopModeMediaQuery="@media (min-width: 0px)"
                      />
                    </Stack>

                    <Stack gap={2}>
                      <Typography variant="caption-semi-bold">{t("affPayoutsTabTable.to")}</Typography>

                      <DatePicker
                        format="dd.MM.yyyy"
                        slotProps={slotProps}
                        value={dates?.[1] || null}
                        sx={datePickerStyle}
                        onChange={(value) => {
                          setDates((state: any) => [state?.[0], value]);
                        }}
                        desktopModeMediaQuery="@media (min-width: 0px)"
                      />
                    </Stack>
                  </Stack>
                </CustomPopover>
              </Box>
            }
          />
          {open && <DownLoadCommissionModal open={open} close={toggle} />}
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AffCommissionsTabTable;
