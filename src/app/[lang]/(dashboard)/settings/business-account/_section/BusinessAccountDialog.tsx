import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { Icon } from "@/components/icons";
import { modifyUser, selectUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserServiceBusinessInfo } from "@minecraft/queries";
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
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface BusinessAccountDialogProps {
  close: VoidFunction;
  open: boolean;
}

const BusinessAccountDialog: FC<BusinessAccountDialogProps> = ({ open, close }) => {
  const { t } = useTranslate();
  const { update } = useSession();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);

  const { mutateAsync, isPending } = useUserServiceBusinessInfo();
  const UpdateUserSchema = Yup.object().shape({
    holder_name: Yup.string().required(t("businessaccount.isrequired")),
    company_name: Yup.string().required(t("businessaccount.isrequired")),
    email: Yup.string().email().required(t("businessaccount.isrequired")),
    country: Yup.string().required(t("businessaccount.isrequired")),
    city: Yup.string().required(t("businessaccount.isrequired")),
    zip_code: Yup.string().required(t("businessaccount.isrequired")),
    address: Yup.string().required(t("businessaccount.isrequired")),
    registration_number: Yup.string().required(t("businessaccount.isrequired")),
    vat_number: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      address: userInfo?.business_info?.address || "",
      city: userInfo?.business_info?.city || "",
      company_name: userInfo?.business_info?.company_name || "",
      country: userInfo?.business_info?.country || "",
      email: userInfo?.business_info?.email || "",
      holder_name: userInfo?.business_info?.holder_name || "",
      zip_code: userInfo?.business_info?.zip_code || "",
      vat_number: userInfo?.business_info?.vat_number || "",
      registration_number: userInfo?.business_info?.registration_number || "",
    },
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    mutateAsync({ requestBody: data })
      .then(() => {
        dispatch(
          modifyUser({
            business_info: {
              ...data,
              created_at: userInfo?.business_info?.created_at || "",
              vat_number: data.vat_number || "",
            },
          })
        );
        update({ user: { business_info: { ...data, created_at: userInfo?.business_info?.created_at || "" } } });
        enqueueSnackbar(t("businessaccount.submittedsuccessmessage"));
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
              {t("businessaccount.businessAccount")}
            </Typography>
          </Stack>

          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack>
          <Typography variant="p2-medium">
            <Typography variant="p2-bold" textTransform="uppercase" color="warning.main">
              {t("businessaccount.note")}:
            </Typography>{" "}
            {t("businessaccount.provideCorrectData")}
          </Typography>
          <FormProvider methods={methods} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="holder_name"
                label={`${t("businessaccount.accountholdername")} *`}
                placeholder={t("businessaccount.AccountholdernamePlaceholder")}
              />
              <RHFTextField
                name="company_name"
                label={`${t("businessaccount.companyname")} *`}
                placeholder={t("businessaccount.companynamePlaceholder")}
              />
            </Stack>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="email"
                label={`${t("businessaccount.email")} *`}
                placeholder={t("businessaccount.emailPlaceholder")}
              />
              <RHFTextField
                name="country"
                label={`${t("billinghistory.country")} *`}
                placeholder={t("billinghistory.countryPlaceHolder")}
              />
            </Stack>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="city"
                label={`${t("billinghistory.city")} *`}
                placeholder={t("billinghistory.cityPlaceHolder")}
              />
              <RHFTextField
                name="zip_code"
                label={`${t("billinghistory.zipCode")} *`}
                placeholder={t("billinghistory.zipCodePlaceHolder")}
              />
            </Stack>
            <RHFTextField
              name="address"
              label={`${t("billinghistory.address")} *`}
              placeholder={t("billinghistory.addressPlaceHolder")}
            />
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="registration_number"
                label={`${t("businessaccount.companyregistrationnumber")} *`}
                placeholder={t("businessaccount.companyregistrationplaceholder")}
              />
              <RHFTextField name="vat_number" label="VAT number" placeholder="Enter VAT number" />
            </Stack>
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={"row"} gap={2} justifyContent="space-between">
          <Button color="info" onClick={close}>
            {t("button.cancel")}
          </Button>
          <LoadingButton onClick={onSubmit} loading={isPending}>
            {userInfo?.business_info?.address ? t("button.saveChanges") : t("button.submit")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BusinessAccountDialog;
