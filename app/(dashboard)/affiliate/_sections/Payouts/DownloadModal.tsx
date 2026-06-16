"use client";

import CustomDialog from "@/components/CustomDialog";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { useTranslate } from "@/locales";
import {
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import DownloadPayoutButton from "./DownloadPayoutButton";
import FormatOption from "./FormatOption";

export default function DownloadModal({ open, close }: any) {
  const [dates, setDates] = useState<any>([]);
  const { t } = useTranslate();
  const [selectedFormat, setSelectedFormat] = useState<"CSV" | "PDF">("PDF");

  // ✅ dummy data instead of API
  const payoutData = [
    {
      id: 1,
      amount: 120,
      created_at: Date.now(),
      status: "completed",
      wallet_id: "wallet_1",
      user_id: "user_1",
    },
    {
      id: 2,
      amount: 250,
      created_at: Date.now(),
      status: "pending",
      wallet_id: "wallet_2",
      user_id: "user_2",
    },
  ];

  const isDownloadDisabled = !dates[0] || !dates[1];

  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4-semi-bold">
            {t("affPayoutsTabTable.dwonloadStatement")}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent dividers>
        <Stack spacing={3} pt={3}>
          <Stack direction={{ xs: "column", md: "row" }} gap={3}>
            <Stack width="100%">
              <Typography variant="caption-semi-bold">
                {t("affPayoutsTabTable.from")}
              </Typography>

              <DatePicker
                value={dates?.[0] || null}
                onChange={(v) => setDates((s: any) => [v, s?.[1]])}
              />
            </Stack>

            <Stack width="100%">
              <Typography variant="caption-semi-bold">
                {t("affPayoutsTabTable.to")}
              </Typography>

              <DatePicker
                value={dates?.[1] || null}
                onChange={(v) => setDates((s: any) => [s?.[0], v])}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography>{t("affPayoutsTabTable.format")}</Typography>

            <Stack direction="row" gap={2}>
              <FormatOption
                iconName="PdfIcon"
                label="PDF"
                isSelected={selectedFormat === "PDF"}
                onClick={() => setSelectedFormat("PDF")}
              />
              <FormatOption
                iconName="CsvIcon"
                label="CSV"
                isSelected={selectedFormat === "CSV"}
                onClick={() => setSelectedFormat("CSV")}
              />
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack width="100%" direction="row" justifyContent="space-between">
          <LoadingButton color="tertiary" onClick={close}>
            {t("affPayoutsTabTable.cancelBtn")}
          </LoadingButton>

          <DownloadPayoutButton
            isDownloadDisabled={isDownloadDisabled}
            payoutData={payoutData}
            fromDate={dates[0]}
            toDate={dates[1]}
            closeModal={close}
            selectedFormat={selectedFormat}
          />
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
}
