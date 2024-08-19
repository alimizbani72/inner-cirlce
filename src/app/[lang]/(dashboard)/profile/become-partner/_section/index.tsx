"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "@/components/Image";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";

const BecomePartnerDialog = () => {
  const { push, back } = useCustomRouter();
  const open = useModalActivation("/become-partner/");
  const { t } = useTranslate();

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="become" open={open} onClose={back}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {t("becomePartner.title")}
            </Typography>
          </Stack>

          <IconButton onClick={back}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3} justifyContent={"center"} alignItems={"center"}>
          <Image src="/assets/png/partner.png" />
          <Typography variant="p2-regular">{t("becomePartner.description")}</Typography>
          <Button onClick={() => push("kyc-info")}>{t("becomePartner.startNow")}</Button>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default BecomePartnerDialog;
