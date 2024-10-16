"use client";

import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Checkbox,
  DialogActions,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import { Icon } from "@/components/icons";
import { LoadingButton } from "@mui/lab";
import { useAffiliateServiceAffiliateTosCreateMutation } from "@minecraft/queries";
import { enqueueSnackbar } from "notistack";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const TACDialog: FC<Props> = ({ close, open }) => {
  const [value, setValue] = useState(false);
  const { mutateAsync, isPending } = useAffiliateServiceAffiliateTosCreateMutation();
  const handleSubmit = async () => {
    mutateAsync()
      .then(() => {
        close();
        enqueueSnackbar("Terms and conditions accepted successfully!", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  return (
    <CustomDialog fullWidth maxWidth="md" onClose={close} open={open}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1} mr={{ md: undefined, xs: 4 }}>
            <Typography variant="h4-semi-bold">Terms and conditions of affiliate agreement</Typography>
          </Stack>
          <IconButton onClick={close} sx={{ mt: { xs: 0.5, md: 1 } }}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Stack gap={3}>
          <Typography variant="p2-medium">
            <Typography variant="p2-bold" textTransform="uppercase" color="warning.main">
              NOTE:
            </Typography>{" "}
            Please read and agree to the terms and conditions to access the affiliate content.
          </Typography>

          <Typography variant="p2-regular">
            This Agreement is made as of [Date] between [Your Company Name] (“Company”) and [Affiliate Name]
            (“Affiliate”).
          </Typography>

          <Stack>
            <Typography variant="p2-semi-bold">1. Purpose</Typography>
            <Typography variant="p2-regular">
              The Affiliate will promote the Company’s products/services and earn commissions on sales generated through
              their unique referral link.
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="p2-semi-bold">2. Commissions</Typography>

            <Typography variant="p2-regular">
              The Affiliate will earn a commission of [Percentage]% on net sales. Payments will be made monthly, within
              [Number] days, with a minimum payout of [Amount].
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="p2-semi-bold">3.Responsibilities</Typography>
            <Typography variant="p2-regular">
              The Affiliate agrees to promote products professionally, use approved marketing materials, and comply with
              applicable laws.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={{ md: "row" }} gap={2} justifyContent="space-between">
          <FormControlLabel
            value={value}
            onChange={(_event, checked) => setValue(checked)}
            control={<Checkbox />}
            label="I have read and agree to the terms and conditions."
          />
          <LoadingButton disabled={!value} onClick={handleSubmit} loading={isPending}>
            Agree & Continue
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TACDialog;
