"use client";

import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { useTranslate } from "@/locales";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { type FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

/**
 * 🔹 Dummy user (replaces useGetMe)
 */
const dummyUser = {
  email: "demo.user@mail.com",
};

/**
 * 🔹 Dummy API (replaces usePostBillingAddress)
 */
const fakePostBillingAddress = async (payload: any) => {
  console.log("POST /billing-address", payload);
  return new Promise((res) => setTimeout(res, 800));
};

interface BillingAddressDialogProps {
  close: VoidFunction;
  open: boolean;
  info?: any; // replaced real API type with dummy-safe type
}

const BillingAddressDialog: FC<BillingAddressDialogProps> = ({
  open,
  close,
  info,
}) => {
  const { t } = useTranslate();
  const [isPending, setIsPending] = useState(false);

  const userInfo = dummyUser;

  const UpdateUserSchema = useMemo(
    () =>
      z.object({
        country: z
          .string()
          .nonempty(t("billinghistory.countryFieldisRequired")),
        city: z.string().nonempty(t("billinghistory.citFieldisRequired")),
        zip_code: z
          .string()
          .nonempty(t("billinghistory.zipcodeFieldisRequired")),
        address: z
          .string()
          .nonempty(t("billinghistory.addressFieldisRequired")),
        first_name: z
          .string()
          .nonempty(t("billinghistory.firstnameFieldisRequired")),
        last_name: z
          .string()
          .nonempty(t("billinghistory.lastnameFieldisRequired")),
      }),
    [t],
  );

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
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
    try {
      setIsPending(true);

      await fakePostBillingAddress({
        ...data,
        email_address: info?.email_address || userInfo.email,
      });

      toast.success(t("billinghistory.successMessage"));
      close();
    } catch (_e) {
      toast.error(t("formErrors.formError"));
    } finally {
      setIsPending(false);
    }
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" open={open} onClose={close}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4-semi-bold">
            {info?.address ? "Change billing address" : "Setup billing address"}
          </Typography>

          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <FormProvider methods={methods}>
          <Stack gap={3} mt={2}>
            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="first_name"
                label={t("billinghistory.firstName")}
              />
              <RHFTextField
                name="last_name"
                label={t("billinghistory.lastName")}
              />
            </Stack>

            <Stack direction={{ md: "row" }} gap={3}>
              <RHFTextField
                name="country"
                label={t("billinghistory.country")}
              />
              <RHFTextField name="city" label={t("billinghistory.city")} />
            </Stack>

            <RHFTextField name="zip_code" label={t("billinghistory.zipCode")} />
            <RHFTextField name="address" label={t("billinghistory.address")} />
          </Stack>
        </FormProvider>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Button color="tertiary" onClick={close}>
            {t("billinghistory.back")}
          </Button>

          <LoadingButton onClick={onSubmit} loading={isPending}>
            {info?.address
              ? t("billinghistory.saveChanges")
              : t("billinghistory.submitSetup")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default BillingAddressDialog;
