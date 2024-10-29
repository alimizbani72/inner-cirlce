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
import { useMemo, type FC } from "react";
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

  const UpdateUserSchema = useMemo(
    () =>
      Yup.object().shape({
        country: Yup.string().required(t("billinghistory.countryFieldisRequired")),
        city: Yup.string().required(t("billinghistory.citFieldisRequired")),
        zip_code: Yup.string().required(t("billinghistory.zipcodeFieldisRequired")),
        address: Yup.string().required(t("billinghistory.addressFieldisRequired")),
        first_name: Yup.string().required(t("billinghistory.firstnameFieldisRequired")),
        last_name: Yup.string().required(t("billinghistory.lastnameFieldisRequired")),
      }),
    [t]
  );

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
        enqueueSnackbar(t("billinghistory.successMessage"));
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
              <RHFTextField
                name="first_name"
                label={t("billinghistory.firstName")}
                placeholder={t("billinghistory.firstNamePlaceHolder")}
              />
              <RHFTextField
                name="last_name"
                label={t("billinghistory.lastName")}
                placeholder={t("billinghistory.lastNamePlaceHolder")}
              />
            </Stack>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="country"
                label={t("billinghistory.country")}
                placeholder={t("billinghistory.countryPlaceHolder")}
              />
              <RHFTextField
                name="city"
                label={t("billinghistory.city")}
                placeholder={t("billinghistory.cityPlaceHolder")}
              />
            </Stack>
            <RHFTextField
              name="zip_code"
              label={t("billinghistory.zipCode")}
              placeholder={t("billinghistory.zipCodePlaceHolder")}
            />
            <RHFTextField
              name="address"
              label={t("billinghistory.address")}
              placeholder={t("billinghistory.addressPlaceHolder")}
            />
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={"row"} gap={2} justifyContent="space-between">
          <Button color="info" onClick={close}>
            {t("billinghistory.back")}
          </Button>
          <LoadingButton onClick={onSubmit} loading={isPending}>
            {info?.address ? t("billinghistory.saveChanges") : t("billinghistory.submitSetup")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BillingAddressDialog;
