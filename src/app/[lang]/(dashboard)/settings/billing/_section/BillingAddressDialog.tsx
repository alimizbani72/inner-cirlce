import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { Icon } from "@/components/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface BillingAddressDialogProps {
  close: VoidFunction;
  open: boolean;
  info: {
    country: string;
    city: string;
    zip_code: string;
    address: string;
  };
}

const BillingAddressDialog: FC<BillingAddressDialogProps> = ({ open, close, info }) => {
  const UpdateUserSchema = Yup.object().shape({
    country: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    zip_code: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: { country: info.country, city: info.city, zip_code: info.zip_code, address: info.address },
    mode: "onSubmit",
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("🚀 ~ data:", data);
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" open={open} onClose={close}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {info.address ? "Change billing address" : "Setup billing address"}
            </Typography>
          </Stack>

          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent="center" alignItems="center">
          <FormProvider methods={methods} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField name="country" label="Country" placeholder="Enter Country" />
              <RHFTextField name="city" label="City" placeholder="Enter City" />
            </Stack>
            <RHFTextField name="zip_code" label="zip code" placeholder="Enter zip code" />
            <RHFTextField name="address" label="address" placeholder="Enter address" />
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={"row"} gap={2} justifyContent="space-between">
          <Button color="info" onClick={close}>
            Back
          </Button>
          <LoadingButton disabled={formState.isDirty} onClick={onSubmit}>
            {info.address ? "Save Changes" : "Submit & Setup"}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BillingAddressDialog;
