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
import { useAccountServiceAuthResetPasswordCreateMutation } from "@minecraft/queries";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useIsMobile } from "@/hooks/use-responsive";
import CustomizedSteppers from "@/components/CustomizedSteppers";

const PersonalInfoDialog = () => {
  const isMobile = useIsMobile();
  const direction = isMobile ? "column" : "row";
  const { t } = useTranslate();

  useAccountServiceAuthResetPasswordCreateMutation();

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
        wallet: Yup.string().required(t("formErrors.requiredCode")),
        street: Yup.string().required(t("formErrors.requiredCode")),
      })
    ),
    defaultValues: {
      fullname: "",
      email: "",
      country: "",
      city: "",
      building: "",
      zipcode: "",
      wallet: "",
      street: "",
    },
    mode: "onSubmit",
  });

  // const onSubmit = handleSubmit(async (data) => {
  //   // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  //   console.log(data);

  //   push("kyc-info");
  // });

  const onSubmit = () => push("/profile/become-partner/kyc-info");

  return (
    <>
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
              <RHFTextField name="email" label="EMAIL" placeholder="Enter your email address" />
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
              <RHFTextField name="wallet" label="USDC Polygon wallet address" placeholder="Enter wallet address" />
            </Stack>
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={nativeBack}>
            Back
          </Button>
          <LoadingButton color="primary" onClick={onSubmit}>
            Next Step
          </LoadingButton>
        </Stack>
      </DialogActions>
    </>
  );
};

export default PersonalInfoDialog;
