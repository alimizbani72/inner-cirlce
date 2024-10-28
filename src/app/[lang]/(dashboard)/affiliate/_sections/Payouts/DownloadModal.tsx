import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { LoadingButton } from "@mui/lab";
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
import FormatOption from "./FormatOption";
import { fDate } from "@/utils/format-time";
import { useFinancialServiceFinancialPayoutsQuery } from "@minecraft/queries";
import DownloadPayoutButton from "./DownloadPayoutButton";

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

export default function DownloadModal({ open, close }: FilterDialogProps) {
  const [dates, setDates] = useState<any>([]);

  const { t } = useTranslate();
  const [selectedFormat, setSelectedFormat] = useState<"CSV" | "PDF">("PDF");

  const filter = {
    filters: {
      ...(dates?.[0] && { from_created_at: fDate(dates?.[0], "yyyy-MM-dd") }),
      ...(dates?.[1] && { to_created_at: fDate(dates?.[1], "yyyy-MM-dd") }),
    },
    sorts: { created_at: false },
    page: 1,
    per_page: 100,
  };

  const { data: payoutData } = useFinancialServiceFinancialPayoutsQuery({
    opts: JSON.stringify(filter) as any,
  });

  const isDownloadDisabled = !dates[0] || !dates[1];
  return (
    <CustomDialog
      fullWidth
      maxWidth="xs"
      onClose={close}
      aria-labelledby="Download-dialog"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="Download-dialog">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4-semi-bold">
            {t("affPayoutsTabTable.dwonloadStatement")}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Stack spacing={3} pt={3}>
          <Stack gap={3} direction={{ xs: "column", md: "row" }}>
            <Stack gap={1} width={"100%"}>
              <Typography variant="caption-semi-bold">
                {t("affPayoutsTabTable.from")}
              </Typography>

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

            <Stack gap={1} width={"100%"}>
              <Typography variant="caption-semi-bold">
                {t("affPayoutsTabTable.to")}
              </Typography>

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
          <Stack spacing={1}>
            <Typography>{t("affPayoutsTabTable.format")}</Typography>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1, md: 3 }}
            >
              <FormatOption
                iconName="PDF"
                label="PDF"
                isSelected={selectedFormat === "PDF"}
                onClick={() => setSelectedFormat("PDF")}
              />
              <FormatOption
                iconName="CSV"
                label="CSV"
                isSelected={selectedFormat === "CSV"}
                onClick={() => setSelectedFormat("CSV")}
              />
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <LoadingButton color="info" onClick={close}>
            {t("affPayoutsTabTable.cancelBtn")}
          </LoadingButton>
          <DownloadPayoutButton
            isDownloadDisabled={isDownloadDisabled}
            payoutData={payoutData?.data as any}
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
