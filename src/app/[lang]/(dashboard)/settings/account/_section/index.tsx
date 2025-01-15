"use client";

import FormProvider, { RHFTextField } from "@/components/hook-form";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { selectUser, modifyUser } from "@/lib/features/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import InputEditor from "@app/_components/InputEditor";
import UserProfile from "./UserProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthServiceMe } from "@minecraft/queries";
import { Button, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TwoFA from "@app/_components/2FA";

const SettingsSection = () => {
  const userInfo = useAppSelector(selectUser);
  const { update } = useSession();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useAuthServiceMe();
  const { push } = useAppRouter();
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("settingsDialog.nameRequired"))
      .test("invalid character", t("settingsDialog.invalidCharacter"), (val) => !/\d/.test(val)),
  });
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: { name: userInfo?.full_name! },
    mode: "onSubmit",
  });

  const { watch } = methods;
  const { name } = watch();

  const onSave = async () => {
    if (name !== userInfo?.full_name) {
      mutateAsync({ requestBody: { full_name: name } })
        .then(() => {
          enqueueSnackbar(t("settingsDialog.nameUpdateSuccess"));
          dispatch(modifyUser({ full_name: name }));
          update({ user: { full_name: name } });
        })
        .catch(() => {
          enqueueSnackbar(t("settingsDialog.nameUpdateFailed"), { variant: "error" });
        });
    }
  };

  return (
    <Stack justifyContent="center" alignItems="center" p={{ sm: 4, xs: 2 }} gap={{ sm: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          {t("settingsDialog.account")}
        </Typography>
      </Stack>

      <Stack justifyContent="center" alignItems="center">
        <UserProfile />

        <FormProvider methods={methods} sx={{ gap: 3, width: "100%", mt: 3 }}>
          <InputEditor name="name" label={t("settingsDialog.fullName")} onSave={onSave} />

          <RHFTextField
            name="Email Address"
            label={t("settingsDialog.email")}
            type="email"
            value={userInfo?.email}
            InputProps={{ readOnly: true }}
          />
        </FormProvider>

        <Stack width={1} mt={3} direction={{ md: "row" }} gap={2} justifyContent="center" alignItems="center">
          <Button
            onClick={() => push("/settings/account/change-password")}
            startIcon={<Icon name="Arrow-Round" />}
            sx={{ whiteSpace: "pre" }}
            fullWidth
            size="large"
            color="info"
          >
            {isMobile ? t("settingsDialog.change") : t("settingsDialog.changePassword")}
          </Button>

          <TwoFA isEnable={!!userInfo?.has_2fa} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SettingsSection;
