import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { Button, DialogContent, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface BillingAddressAlertDialogProps {
  close: VoidFunction;
  open: boolean;
  onSubmit: VoidFunction;
}

const BillingAddressAlertDialog: FC<BillingAddressAlertDialogProps> = ({ open, close, onSubmit }) => {
  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="withdraw-dialog" open={!!open}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ px: 3, textAlign: "center" }} gap={1}>
          <Icon name="Danger" size={64} />
          <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
            Setup Your Billing Address
          </Typography>
          <Typography variant="p2-regular" color={"grey.light"}>
            For download or preview, you should setup your billing address first.
          </Typography>
          <Stack direction={{ md: "row" }} justifyContent={"space-between"} gap={2} sx={{ width: "100%", mt: 3 }}>
            <Button color="info" fullWidth onClick={close}>
              Discard
            </Button>
            <Button fullWidth onClick={onSubmit}>
              Setup Now
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default BillingAddressAlertDialog;
