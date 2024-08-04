"use client";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UserProfile from "./UserProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";

import * as Yup from "yup";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAuthServiceMe, useAuthServiceMeQueryKey } from "@minecraft/queries";
import InputEditor from "@app/_components/InputEditor";
import { enqueueSnackbar } from "notistack";
import { getQueryClient } from "@app/_providers/customQueryClient";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const SettingsDialog = () => {
  const open = useModalActivation("/settings/");
  const queryClient = getQueryClient();
  const userInfo = useAppSelector(selectUser);
  const { mutateAsync } = useAuthServiceMe();
  const { push, back } = useCustomRouter();
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
      mutateAsync({ requestBody: { full_name: name, avatar_url: userInfo?.avatar_url } })
        .then(() => {
          enqueueSnackbar(t("settingsDialog.nameUpdateSuccess"));
          queryClient.invalidateQueries({ queryKey: [useAuthServiceMeQueryKey] });
        })
        .catch(() => {
          enqueueSnackbar(t("settingsDialog.nameUpdateFailed"), { variant: "error" });
        });
    }
  };

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="setting" open={open} onClose={back}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <IconButton onClick={() => push("/profile")}>
              <Icon name="Arrow-left" />
            </IconButton>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              {t("settingsDialog.profileSettings")}
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
          <UserProfile />
          <FormProvider methods={methods} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <InputEditor name="name" label={t("settingsDialog.fullName")} onSave={onSave} />

            <RHFTextField
              name="password"
              label={t("settingsDialog.password")}
              type="password"
              value="password"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Button
                    onClick={() => push("/profile/change-password")}
                    startIcon={<Icon name="Arrow-Round" />}
                    sx={{ whiteSpace: "pre" }}
                    fullWidth
                    color="secondary"
                  >
                    {isMobile ? t("settingsDialog.change") : t("settingsDialog.changePassword")}
                  </Button>
                ),
              }}
            />
          </FormProvider>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default SettingsDialog;
