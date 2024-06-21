"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAccountServiceAuthResetPasswordCreateMutation } from "@minecraft/queries";
import { LoadingButton } from "@mui/lab";
import CustomizedSteppers from "@/components/CustomizedSteppers";
import QRCodeWithIcon from "@/components/QRCodeWithIcon";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFTextField } from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import * as Yup from "yup";

const TwoFactorDialog = () => {
  useAccountServiceAuthResetPasswordCreateMutation();

  const { push, back, nativeBack } = useCustomRouter();

  const FormSchema = useMemo(
    () =>
      Yup.object().shape({
        authcode: Yup.string(),
      }),
    []
  );
  const defaultValues = useMemo(
    () => ({
      authcode: "",
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  // const onSubmit = handleSubmit(async (data) => {
  //   // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  //   console.log(data);

  //   push("kyc-info");
  // });

  const onSubmit = () => push("/profile/become-partner/success");

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
          <CustomizedSteppers activeStep={2} />

          <Divider flexItem />
          <Stack gap={3} justifyContent={"center"}>
            <Stack gap={2}>
              <Typography variant="p2-regular">
                For added security, please set up Two-Factor Authentication (2FA).
              </Typography>
              <Typography variant="p2-regular">
                Scan the QR code with authentication app and enter the code below.
              </Typography>
            </Stack>
            <Stack alignItems={"center"} sx={{ width: "100%" }}>
              <QRCodeWithIcon value={"https://google.com"} iconSrc="/logo/logo.svg" size={123} />
            </Stack>
            <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 5, alignItems: "flex-start" }}>
              <RHFTextField name="authcode" label={"Authentication Code"} placeholder={"Enter Authentication Code"} />
            </FormProvider>
          </Stack>
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

export default TwoFactorDialog;
