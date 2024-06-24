"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useTranslate } from "@/locales";
import {
  useAccountServiceAuthUserinfoQuery,
  useAccountServiceAuthUserinfoQueryKey,
  useUserServiceAccountsPartnerCreateMutation,
  useWalletServiceWalletCreateMutation,
  useWalletServiceWalletDefaultQuery,
} from "@minecraft/queries";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useIsMobile } from "@/hooks/use-responsive";
import CustomizedSteppers from "@/components/CustomizedSteppers";
import CustomDialog from "@/components/CustomDialog";
import { useMemo } from "react";
import { useModalActivation } from "@/hooks/useModalActivation";
import { enqueueSnackbar } from "notistack";
import { getQueryClient } from "@app/_providers/customQueryClient";

const PersonalInfoDialog = () => {
  const isMobile = useIsMobile();
  const open = useModalActivation("/personal-info/");
  const queryClient = getQueryClient();
  const direction = isMobile ? "column" : "row";
  const { t } = useTranslate();
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();
  const { mutateAsync: createWallet } = useWalletServiceWalletCreateMutation();

  const { mutate: createPartner, isPending } = useUserServiceAccountsPartnerCreateMutation();

  const defaultValues = useMemo(
    () => ({
      fullname: (userInfo as any)?.data?.full_name,
      email: (userInfo as any)?.data?.email,
      country: (userInfo as any)?.data?.country,
      city: (userInfo as any)?.data?.city,
      building: (userInfo as any)?.data?.building_number,
      zipcode: (userInfo as any)?.data?.zip_code,
      street: (userInfo as any)?.data?.street,
      wallet: "",
    }),
    [userInfo]
  );

  const { push, back, nativeBack } = useCustomRouter();

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        fullname: Yup.string().required(t("formErrors.requiredCode")),
        email: Yup.string().required(t("formErrors.requiredCode")),
        country: Yup.string().required(t("formErrors.requiredCode")),
        city: Yup.string().required(t("formErrors.requiredCode")),
        building: Yup.string().required(t("formErrors.requiredCode")),
        zipcode: Yup.string().required(t("formErrors.requiredCode")),
        wallet: Yup.string()
          .required(t("formErrors.requiredCode"))
          .matches(/^(0x)?[0-9a-fA-F]{40}$/, "Invalid Polygon wallet address"),
        street: Yup.string().required(t("formErrors.requiredCode")),
      })
    ),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, setValue, formState } = methods;
  const { data: defaultWallet } = useWalletServiceWalletDefaultQuery(undefined, {
    select(data) {
      if (data?.data?.address) {
        setValue("wallet", data?.data?.address as string);
      }
      return data;
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createWallet(
        { requestBody: { address: data.wallet as string, name: "main" } },
        {
          onSuccess() {
            createPartner(
              {
                requestBody: {
                  building_number: data.building,
                  city: data.city,
                  country: data.country,
                  full_name: data.fullname,
                  street: data.street,
                  zip_code: data.zipcode,
                },
              },
              {
                onSuccess() {
                  queryClient.invalidateQueries({ queryKey: [useAccountServiceAuthUserinfoQueryKey] });
                  push("/profile/become-partner/kyc-info");
                },
              }
            );
          },
        }
      );
    } catch (_error) {
      enqueueSnackbar("Failed to update profile! Please try again", { variant: "error" });
    }
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="personal-info" open={open} onClose={back}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              Become a Partner
            </Typography>
          </Stack>

          <IconButton onClick={back}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3}>
          <CustomizedSteppers activeStep={0} />

          <Divider flexItem />

          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
            <Stack direction={direction} spacing={3}>
              <RHFTextField name="fullname" label="FULL NAME" placeholder="Enter your full name" />
              <RHFTextField
                name="email"
                label="EMAIL"
                placeholder="Enter your email address"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Stack>
            <Stack direction={direction} spacing={3}>
              <RHFTextField name="country" label="Country" placeholder="Select a country" />
              <RHFTextField name="city" label="City" placeholder="Select a city" />
            </Stack>
            <Stack direction={direction} spacing={3}>
              <RHFTextField name="street" label="Street" placeholder="Enter street name" />
              <RHFTextField name="building" label="Budling number" placeholder="Enter building number" />
            </Stack>
            <Stack direction={direction} spacing={3}>
              <RHFTextField name="zipcode" label="Zip Code" placeholder="Enter zip code" />
              <RHFTextField
                name="wallet"
                label="USDC Polygon wallet address"
                placeholder="Enter wallet address"
                InputProps={{
                  readOnly: !!defaultWallet?.data?.address,
                }}
              />
            </Stack>
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={nativeBack}>
            Back
          </Button>
          <LoadingButton color="primary" onClick={onSubmit} loading={isPending} disabled={!formState.isValid}>
            Next Step
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default PersonalInfoDialog;
