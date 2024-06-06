"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useAccountServiceAuthChangePassword,
  useAccountServiceAuthUserinfoQuery,
  useVerifyServiceVerificationsSendCreateMutation,
} from "@/services/queries";
import { useSnackbar } from "notistack";

const UpdateUserSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Please enter your new password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmNewPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Both password must match."),
  currentPassword: Yup.string().required("Please enter your current password"),
});

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePasswordDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { push, back, nativeBack } = useCustomRouter();
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

  const { mutateAsync, isPending } = useAccountServiceAuthChangePassword();
  const { mutateAsync: sendVerification, isPending: isForgetPassPending } =
    useVerifyServiceVerificationsSendCreateMutation();

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync({ requestBody: { old_password: data.currentPassword, new_password: data.newPassword } });
      reset();
      enqueueSnackbar("Password changed successfully!");
      push("/profile");
    } catch (error) {
      enqueueSnackbar(error?.message || "Failed to update password!", { variant: "error" });
    }
  });

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} id="change-password-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <IconButton onClick={nativeBack}>
              <Icon name="Arrow-left" />
            </IconButton>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              Change Password
            </Typography>
          </Stack>

          <IconButton onClick={back}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent="center" alignItems="center">
          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <RHFTextField name="currentPassword" label="Current Password" placeholder="Enter your current password" />
            <Typography
              mt="-16px"
              variant="p2-medium"
              textAlign={"right"}
              onClick={async () => {
                await sendVerification({ requestBody: { email: (userInfo as any)?.data?.email } }).then(() => {
                  push("/profile/forget-password");
                });
              }}
              sx={{
                background: (theme) => (isForgetPassPending ? theme.palette.grey.light : theme.palette.gradient.pink),
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </Typography>

            <RHFTextField
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              helperText="Use 8 or more characters with a mix of letters, numbers, and symbols."
            />
            <RHFTextField
              name="confirmNewPassword"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              helperText="Both password must match."
            />
          </FormProvider>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={nativeBack}>
            Cancel
          </Button>
          <LoadingButton color="primary" onClick={onSubmit} loading={isPending}>
            Save Change
          </LoadingButton>
        </Stack>
      </DialogActions>
    </>
  );
};

export default ChangePasswordDialog;
