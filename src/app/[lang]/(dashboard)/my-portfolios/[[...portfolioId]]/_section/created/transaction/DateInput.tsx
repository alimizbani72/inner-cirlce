"use client";
import { useTranslate } from "@/locales";
import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

type Props = {
  onConfirm?: (date: any) => void;
  initialDate?: any;
};
const DateInput = ({ initialDate, onConfirm }: Props) => {
  const { t } = useTranslate();

  return (
    <Stack gap={1} width={"100%"}>
      <Typography variant="caption-semi-bold" textTransform={"uppercase"}>
        {t("portfolioTransaction.date")}
      </Typography>

      <DatePicker
        format="yyyy-MM-dd"
        value={initialDate}
        slotProps={slotProps}
        sx={datePickerStyle}
        minDate={new Date(2009, 0, 1)}
        maxDate={new Date()}
        onChange={(newDate) => {
          if (onConfirm) {
            onConfirm(newDate);
          }
        }}
        desktopModeMediaQuery="@media (min-width: 0px)"
      />
    </Stack>
  );
};

export default DateInput;
