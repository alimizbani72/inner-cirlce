import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { Button, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslate } from "@/locales";
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

type DateModalProps = {
  open: boolean;
  close: VoidFunction;
  onConfirm?: (date: any) => void;
  initialDate?: any;
};

export default function DateAndTimeModal({ open, close, onConfirm, initialDate }: DateModalProps) {
  const { t } = useTranslate();
  const [date, setDate] = useState<Date | null>(initialDate || null);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(date);
    }
    close();
  };

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      aria-labelledby="DateAndTime-dialog"
      open={open}
      disableScrollLock={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="DateAndTime-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">{t("portfolioTransaction.dateAndTime")}</Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={3} py={3}>
          <Stack gap={1} width={"100%"}>
            <Typography variant="caption-semi-bold" textTransform={"uppercase"}>
              {t("portfolioTransaction.date")}
            </Typography>

            <DatePicker
              format="yyyy-MM-dd"
              value={date}
              slotProps={slotProps}
              sx={datePickerStyle}
              minDate={new Date(2009, 0, 1)}
              maxDate={new Date()}
              onChange={(newDate) => setDate(newDate)}
              desktopModeMediaQuery="@media (min-width: 0px)"
            />
          </Stack>
          {/* 
          <Stack gap={1} width={"100%"}>
            <Typography variant="caption-semi-bold" textTransform={"uppercase"}>
              {t("portfolioTransaction.time")}
            </Typography>

            <TimePicker
              value={time}
              slots={{
                actionBar: () => null,
              }}
              slotProps={{
                desktopPaper: {
                  sx: {
                    backgroundColor: "dark.2",
                    boxShadow: "0px 24px 64px 0px rgba(0, 0, 0, 0.24)",
                    border: "1px solid",
                    color: "white",
                  },
                },
              }}
              sx={{
                ".MuiIconButton-root": {
                  color: "white",
                  mr: "1px",
                },
              }}
              onChange={(value) => setTime(value)}
              desktopModeMediaQuery="@media (min-width: 0px)"
            />
          </Stack> */}
        </Stack>
      </DialogContent>
      <Divider />
      <Stack direction={"row"} justifyContent={"space-between"} p={3}>
        <Button onClick={close} color="info" size="large">
          {t("portfolioTransaction.cancel")}
        </Button>
        <Button onClick={handleConfirm} size="large">
          {t("portfolioTransaction.changeDateTime")}
        </Button>
      </Stack>
    </CustomDialog>
  );
}
