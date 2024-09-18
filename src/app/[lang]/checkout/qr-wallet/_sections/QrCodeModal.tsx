import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import QRCodeWithIcon from "@/components/QRCodeWithIcon";
import { useTranslate } from "@/locales";
import { DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material";

type FilterDialogProps = {
  open: boolean;
  close: VoidFunction;
  currencyCode: any;
  walletAddress: string;
};

export default function QrCodeModal({ open, close, currencyCode, walletAddress }: FilterDialogProps) {
  const { t } = useTranslate();
  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="QrCode-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="QrCode-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">QR Code</Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Stack alignItems={"center"} pt={3}>
          <QRCodeWithIcon value={walletAddress} iconSrc={`/assets/currencies/${currencyCode}.svg`} size={244} />
          <Typography variant="h4-semi-bold" mt={2}>
            {currencyCode} -{" "}
            <Typography variant="h4-semi-bold" color={"warning.main"}>
              {t("checkout.polygonNetwork")}
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
}
