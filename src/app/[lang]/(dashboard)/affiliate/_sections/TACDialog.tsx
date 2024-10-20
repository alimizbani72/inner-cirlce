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
import { useGlobalAffilateTermsServiceGetGlobalsAffilateTerms } from "@cms/queries";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { useAppSelector } from "@/lib/hooks";
import dynamic from "next/dynamic";
const CMSContentParser = dynamic(() => import("@app/_components/CMSContentParser"), { ssr: false });

type Props = {
  close: VoidFunction;
  open: boolean;
};

const TACDialog: FC<Props> = ({ close, open }) => {
  const lang = useAppSelector(selectLang);

  const [value, setValue] = useState(false);
  const { data } = useGlobalAffilateTermsServiceGetGlobalsAffilateTerms({ locale: lang });

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
          <CMSContentParser layout={data?.layout} />
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
