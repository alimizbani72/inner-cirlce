"use client";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { Icon } from "@/components/icons";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";

const SuccessDialog = () => {
  const open = useModalActivation("/success/");
  const { back } = useCustomRouter();
  const { t } = useTranslate();

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="success" open={open} onClose={back}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3} alignItems={"center"}>
          <IconButton
            disabled
            sx={{
              "&.Mui-disabled": {
                bgcolor: "#00B171",
              },
              width: "40px !important",
              height: "40px !important",
            }}
          >
            <Icon name="Check" size={40} />
          </IconButton>
          <Stack gap={1} sx={{ textAlign: "center" }}>
            <Typography variant="h4-semi-bold">{t("successDialog.requestSent")}</Typography>
            <Typography variant="p2-regular">{t("successDialog.reviewMessage")}</Typography>
          </Stack>
          <Button color="info" onClick={back}>
            {t("successDialog.backToHome")}
          </Button>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default SuccessDialog;
