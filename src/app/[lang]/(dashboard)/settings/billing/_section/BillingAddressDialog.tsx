import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { Icon } from "@/components/icons";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { getQueryClient } from "@app/_providers/customQueryClient";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFinancialServiceBillingAddressCreateMutation,
  useFinancialServiceBillingAddressQueryKey,
} from "@minecraft/queries";
import type { BillingAddressResponse } from "@minecraft/requests";
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
import { enqueueSnackbar } from "notistack";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface BillingAddressDialogProps {
  close: VoidFunction;
  open: boolean;
  info?: BillingAddressResponse;
}

const BillingAddressDialog: FC<BillingAddressDialogProps> = ({ open, close, info }) => {
  const { t } = useTranslate();
  const queryClient = getQueryClient();
  const userInfo = useAppSelector(selectUser);

  const { mutateAsync, isPending } = useFinancialServiceBillingAddressCreateMutation();

  const UpdateUserSchema = Yup.object().shape({
    country: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    zip_code: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
    first_name: Yup.string().required("This field is required"),
    last_name: Yup.string().required("This field is required"),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      country: info?.country || "",
      city: info?.city || "",
      zip_code: info?.zipcode || "",
      address: info?.address || "",
      first_name: info?.first_name || "",
      last_name: info?.last_name || "",
    },
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    mutateAsync({ requestBody: { ...data, email_address: info?.email_address || userInfo?.email } as any })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [useFinancialServiceBillingAddressQueryKey] });
        enqueueSnackbar("Your Billing address has been updated successfully.");
        close();
      })
      .catch(() => enqueueSnackbar(t("formErrors.formError"), { variant: "error" }));
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" open={open} onClose={close}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {info?.address ? "Change billing address" : "Setup billing address"}
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
              <RHFTextField name="first_name" label="First name" placeholder="Enter your first name" />
              <RHFTextField name="last_name" label="Last name" placeholder="Enter your last name" />
            </Stack>
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
          <LoadingButton onClick={onSubmit} loading={isPending}>
            {info?.address ? "Save Changes" : "Submit & Setup"}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BillingAddressDialog;
