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
    holder_name: Yup.string().required("This field is required"),
    company_name: Yup.string().required("This field is required"),
    email: Yup.string().email().required("This field is required"),
    country: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    zip_code: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
    registration_number: Yup.string().required("This field is required"),
    vat_number: Yup.string().required("This field is required"),
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
        dispatch(modifyUser({ business_info: { ...data, created_at: userInfo?.business_info?.created_at || "" } }));
        update({ user: { business_info: { ...data, created_at: userInfo?.business_info?.created_at || "" } } });
        enqueueSnackbar("Your business account request has been submitted successfully.");
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
              Business Account
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
          <Typography variant="p2-regular">
            <Typography variant="p2-medium" textTransform="uppercase" color="warning.main">
              NOTE:
            </Typography>{" "}
            Please provide correct data; it will be verified.
          </Typography>
          <FormProvider methods={methods} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField name="holder_name" label="Account holder name" placeholder="Enter account holder name" />
              <RHFTextField name="company_name" label="Company name" placeholder="Enter company name" />
            </Stack>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField name="email" label="Email" placeholder="Enter your email address" />
              <RHFTextField name="country" label="Country" placeholder="Enter Country" />
            </Stack>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField name="city" label="City" placeholder="Enter City" />
              <RHFTextField name="zip_code" label="zip code" placeholder="Enter zip code" />
            </Stack>
            <RHFTextField name="address" label="address" placeholder="Enter address" />
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="registration_number"
                label="Company registration number"
                placeholder="Enter company registration number"
              />
              <RHFTextField name="vat_number" label="VAT number" placeholder="Enter VAT number" />
            </Stack>
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack flex={1} direction={"row"} gap={2} justifyContent="space-between">
          <Button color="info" onClick={close}>
            Cancel
          </Button>
          <LoadingButton onClick={onSubmit} loading={isPending}>
            {userInfo?.business_info?.address ? "Save Changes" : "Submit & Active"}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BusinessAccountDialog;
