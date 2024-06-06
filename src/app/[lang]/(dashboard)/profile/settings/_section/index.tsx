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
import { useAccountServiceAuthUserinfoQuery } from "@/services/queries";

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test("invalid character", "Your name can't contain numbers", (val) => !/\d/.test(val)),
  checkbox: Yup.boolean(),
});

const defaultValues = {
  name: "",
  checkbox: false,
};

const SettingsDialog = () => {
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();
  const { push, back } = useCustomRouter();
  const isMobile = useIsMobile();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("🚀 ~ data:", data);
  });

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <IconButton onClick={() => push("/profile")}>
              <Icon name="Arrow-left" />
            </IconButton>
            <Typography variant="h4-semi-bold" color={"common.white"}>
              Profile Settings
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
          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <RHFTextField
              name="name"
              label={"Full Name"}
              placeholder={(userInfo as any)?.data?.full_name}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={() => console.log("Aa")}>
                    <Icon name="Pen" />
                  </IconButton>
                ),
              }}
            />
            <RHFTextField
              name="password"
              label={"Password"}
              placeholder="........"
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
                    {isMobile ? "Change" : "Change Password"}
                  </Button>
                ),
              }}
            />
          </FormProvider>
        </Stack>
      </DialogContent>
    </>
  );
};

export default SettingsDialog;
