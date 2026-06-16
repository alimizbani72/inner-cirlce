"use client";

import type React from "react";
import {
  type ChangeEvent,
  type FC,
  useCallback,
  useMemo,
  useState,
} from "react";

import CustomTable from "@/components/CustomTable";
import CustomPopover from "@/components/custom-popover/custom-popover";
import usePopover from "@/components/custom-popover/use-popover";
import Icon from "@/components/icon";
import useToggleState from "@/hooks/use-toggle-state";
import { useTranslate } from "@/locales";
import { fDate } from "@/utils/format-time";
import { formatCurrency } from "@/utils/toNumber";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import DownloadModal from "./DownloadModal";

const AffPayoutsTabTable: FC = () => {
  const { t } = useTranslate();
  const [open, toggle] = useToggleState();
  const filterPopover = usePopover();

  const [page, setPage] = useState(1);
  const [dates, setDates] = useState<any>([]);

  // ✅ dummy payout data
  const data = {
    data: [
      {
        id: 1,
        user_id: "user_1",
        wallet_id: "wallet_1",
        amount: 100,
        created_at: Date.now(),
        status: "completed",
      },
      {
        id: 2,
        user_id: "user_2",
        wallet_id: "wallet_2",
        amount: 250,
        created_at: Date.now(),
        status: "pending",
      },
    ],
    meta: { total_count: 2 },
  };

  const isPending = false;

  const columns = useMemo(
    () => [
      {
        title: t("affPayoutsTabTable.userId"),
        modify: (row: any) => row.user_id,
      },
      {
        title: t("affPayoutsTabTable.walletId"),
        modify: (row: any) => row.wallet_id,
      },
      {
        title: t("affPayoutsTabTable.amount"),
        modify: (row: any) => formatCurrency(row.amount),
      },
      {
        title: t("affPayoutsTabTable.date"),
        modify: (row: any) => fDate(row.created_at, "DD.MM.YYYY"),
      },
      {
        title: t("affPayoutsTabTable.status"),
        modify: (row: any) => row.status,
      },
    ],
    [t],
  );

  const handleOpenFilter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      filterPopover.onOpen(event);
    },
    [filterPopover],
  );

  const handleCloseFilter = useCallback(() => {
    filterPopover.onClose();
  }, [filterPopover]);

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Stack px={{ md: 4, xs: 0 }} pt={3}>
      <CustomTable
        title={t("affPayoutsTabTable.payouts")}
        columns={columns}
        page={page}
        handleChangePage={handleChangePage}
        totalCount={data.meta.total_count}
        data={data.data}
        isPending={isPending}
        emptyTitle={t("affPayoutsTabTable.emptyTitle")}
        containerHeight="max-content"
        mobileAction={
          <Button startIcon={<Icon name="DownloadIcon" />} onClick={toggle}>
            {t("affPayoutsTabTable.dwonloadStatement")}
          </Button>
        }
        action={
          <Box>
            <Stack direction="row" gap={2}>
              <Box
                onClick={handleOpenFilter}
                sx={{ display: "flex", cursor: "pointer" }}
              >
                <Typography variant="p2-semi-bold">
                  {dates.length
                    ? `${fDate(dates?.[0], "DD.MM.YYYY")} - ${fDate(dates?.[1], "DD.MM.YYYY")}`
                    : t("affPayoutsTabTable.dateAndTime")}
                </Typography>
                <Icon
                  name={filterPopover.open ? "ArrowUpIcon" : "ArrowDownIcon"}
                />
              </Box>

              <Button onClick={toggle} color="tertiary">
                {t("affPayoutsTabTable.dwonloadStatement")}
              </Button>
            </Stack>

            <CustomPopover
              open={filterPopover.open}
              onClose={handleCloseFilter}
            >
              <Stack gap={2}>
                <DatePicker
                  value={dates?.[0] || null}
                  onChange={(v) => setDates((s: any) => [v, s?.[1]])}
                />
                <DatePicker
                  value={dates?.[1] || null}
                  onChange={(v) => setDates((s: any) => [s?.[0], v])}
                />
              </Stack>
            </CustomPopover>
          </Box>
        }
      />

      {open && <DownloadModal open={open} close={toggle} />}
    </Stack>
  );
};

export default AffPayoutsTabTable;
