"use client";

import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DialogActions,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";

import CustomDialog from "@/components/CustomDialog";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import useCustomRouter from "@/hooks/useCustomRouter";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";
import { useState } from "react";
import { toast } from "sonner";
import zod from "zod";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const ChangePasswordDialog = () => {
  const open = useModalActivation("/change-password");
  const { push, nativeBack } = useCustomRouter();
  const { t } = useTranslate();

  // ✅ dummy user
  const userEmail = "demo@example.com";

  // ✅ fake loading states
  const [isPending, setIsPending] = useState(false);
  const [isForgetPassPending, setIsForgetPassPending] = useState(false);

  // ✅ fake API: change password
  const fakeChangePassword = (data: any) =>
    new Promise((resolve, reject) => {
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);

        // simulate success/failure
        if (data.old_password === "wrong") {
          reject({ message: "Wrong current password" });
        } else {
          resolve(true);
        }
      }, 1000);
    });

  // ✅ fake API: send code
  const fakeSendCode = () =>
    new Promise((resolve) => {
      setIsForgetPassPending(true);
      setTimeout(() => {
        setIsForgetPassPending(false);
        resolve(true);
      }, 1000);
    });

  const UpdateUserSchema = zod
    .object({
      newPassword: zod
        .string()
        .nonempty(t("formErrors.requiredNewPassword"))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          t("formErrors.newPasswordPattern"),
        ),
      confirmNewPassword: zod.string(),
      currentPassword: zod
        .string()
        .nonempty(t("formErrors.requiredCurrentPassword")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("formErrors.confirmPassword"),
      path: ["confirmNewPassword"],
    });

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await fakeChangePassword({
        old_password: data.currentPassword,
        new_password: data.newPassword,
      });

      reset();
      toast.success(t("changePassword.passwordChangedSuccess"));
      push("/settings/account");
    } catch (error: any) {
      toast.error(error?.message || t("changePassword.passwordChangedFailed"));
    }
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="change-password"
      open={open}
      onClose={nativeBack}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={nativeBack}>
              <Icon name="ArrowLeftIcon" />
            </IconButton>
            <Typography variant="h4-semi-bold" color="common.white">
              {t("changePassword.title")}
            </Typography>
          </Stack>

          <IconButton onClick={nativeBack}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent="center" alignItems="center">
          <FormProvider
            methods={methods}
            onSubmit={onSubmit}
            sx={{ gap: 3, width: "100%", mt: 3 }}
          >
            <RHFTextField
              name="currentPassword"
              label={t("changePassword.currentPassword")}
              placeholder={t("changePassword.enterCurrentPassword")}
            />

            {/* ✅ fake forgot password */}
            <Typography
              mt="-16px"
              variant="p2-medium"
              textAlign="right"
              onClick={async () => {
                await fakeSendCode();
                toast.success("Verification sent to " + userEmail);
                push("/settings/account/forget-password");
              }}
              sx={{
                background: (theme) =>
                  isForgetPassPending
                    ? theme.palette.grey.light
                    : theme.palette.gradient.pink,
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                cursor: "pointer",
              }}
            >
              {t("changePassword.forgotPassword")}
            </Typography>

            <RHFTextField
              name="newPassword"
              label={t("changePassword.newPassword")}
              placeholder={t("changePassword.enterNewPassword")}
              helperText={t("changePassword.passwordHelperText")}
            />

            <RHFTextField
              name="confirmNewPassword"
              label={t("changePassword.confirmNewPassword")}
              placeholder={t("changePassword.confirmNewPasswordPlaceholder")}
              helperText={t("changePassword.confirmPasswordHelperText")}
            />
          </FormProvider>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack width="100%" direction="row" justifyContent="space-between">
          <Button color="tertiary" onClick={nativeBack}>
            {t("button.cancel")}
          </Button>

          <LoadingButton color="primary" onClick={onSubmit} loading={isPending}>
            {t("changePassword.saveChange")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default ChangePasswordDialog;
