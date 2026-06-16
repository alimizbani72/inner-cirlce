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
import FormatOption from "../Payouts/FormatOption";

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
  calendarHeader: {
    sx: { ".MuiPickersCalendarHeader-label": { color: "white" } },
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

type FilterDialogProps = {
  open: boolean;
  close: VoidFunction;
};

export default function DownLoadCommissionModal({
  open,
  close,
}: FilterDialogProps) {
  const { t } = useTranslate();

  const [dates, setDates] = useState<any>([]);
  const [selectedFormat, setSelectedFormat] = useState<"PDF" | "CSV">("PDF");

  // ✅ DUMMY DATA (no API)
  const commissionList = {
    data: [
      {
        id: 1,
        amount: { value: 120, currency_code: "USD" },
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        amount: { value: 250, currency_code: "USD" },
        created_at: new Date().toISOString(),
      },
    ],
  };

  const isDownloadDisabled = !dates?.[0] || !dates?.[1];

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
            <Stack gap={1} width="100%">
              <Typography variant="caption-semi-bold">
                {t("affPayoutsTabTable.from")}
              </Typography>

              <DatePicker
                format="DD.MM.YYYY"
                value={dates?.[0] || null}
                slotProps={slotProps}
                sx={datePickerStyle}
                onChange={(value) => setDates([value, dates?.[1]])}
              />
            </Stack>

            <Stack gap={1} width="100%">
              <Typography variant="caption-semi-bold">
                {t("affPayoutsTabTable.to")}
              </Typography>

              <DatePicker
                format="DD.MM.YYYY"
                value={dates?.[1] || null}
                slotProps={slotProps}
                sx={datePickerStyle}
                onChange={(value) => setDates([dates?.[0], value])}
              />
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Typography>{t("affPayoutsTabTable.format")}</Typography>

            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
        <Stack direction="row" width="100%" justifyContent="space-between">
          <LoadingButton color="tertiary" onClick={close}>
            {t("affPayoutsTabTable.cancelBtn")}
          </LoadingButton>

          <LoadingButton
            disabled={isDownloadDisabled}
            onClick={() => {
              console.log("mock download", {
                dates,
                selectedFormat,
                commissionList,
              });
              close();
            }}
          >
            Download
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
}
