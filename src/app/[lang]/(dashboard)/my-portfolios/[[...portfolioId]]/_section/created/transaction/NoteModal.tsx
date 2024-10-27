import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { Button, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
const CustomTextArea = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.dark[2],
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    "&:focus": {
      backgroundColor: theme.palette.dark[1],
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.dark[3],
    borderWidth: "2px",
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
    "&::placeholder": {
      opacity: 1,
      color: theme.palette.grey.dark,
    },
  },
}));
type DateModalProps = {
  open: boolean;
  close: VoidFunction;
  onConfirm?: (note: string) => void;
  initialNote?: string;
};

export default function NoteModal({ open, close, onConfirm, initialNote }: DateModalProps) {
  const { t } = useTranslate();
  const [note, setNote] = useState<string>(initialNote ?? "");
  const handleAddNote = () => {
    if (onConfirm) {
      onConfirm(note);
    }
    close();
  };
  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      aria-labelledby="Note-dialog"
      open={open}
      disableScrollLock={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="Note-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} spacing={1}>
            <IconButton onClick={close}>
              <Icon name="Arrow-left" />
            </IconButton>

            <Typography variant="h4-semi-bold">{t("portfolioTransaction.addNote")}</Typography>
          </Stack>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack width={"100%"} spacing={1} py={3}>
          <Typography variant="caption-medium" textTransform={"uppercase"}>
            {t("portfolioTransaction.note")}
          </Typography>
          <CustomTextArea
            value={note}
            multiline
            placeholder={t("portfolioTransaction.notePlaceholder")}
            variant="outlined"
            onChange={(e) => setNote(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <Divider />
      <Stack direction={"row"} justifyContent={"space-between"} p={3}>
        <Button onClick={close} color="info" size="large">
          {t("portfolioTransaction.cancel")}
        </Button>
        <Button onClick={handleAddNote} size="large">
          {t("portfolioTransaction.addNote")}
        </Button>
      </Stack>
    </CustomDialog>
  );
}
