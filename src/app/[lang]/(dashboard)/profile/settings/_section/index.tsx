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
import {
  useAccountServiceAuthUserinfoQuery,
  useAccountServiceAuthUserinfoQueryKey,
  useUserServiceAccountsUpdateCreateMutation,
} from "@minecraft/queries";
import InputEditor from "@app/_components/InputEditor";
import { enqueueSnackbar } from "notistack";
import { getQueryClient } from "@app/_providers/customQueryClient";
import CustomDialog from "@/components/CustomDialog";

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .test("invalid character", "Your name can't contain numbers", (val) => !/\d/.test(val)),
});

const SettingsDialog = () => {
  const queryClient = getQueryClient();
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();
  const { mutateAsync } = useUserServiceAccountsUpdateCreateMutation();
  const { push, back } = useCustomRouter();
  const isMobile = useIsMobile();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: { name: (userInfo as any)?.data?.full_name },
    mode: "onSubmit",
  });

  const { watch } = methods;
  const { name } = watch();

  const onSave = async () => {
    if (name !== (userInfo as any)?.data?.full_name) {
      mutateAsync({ requestBody: { full_name: name, avatar_url: (userInfo as any)?.data?.avatar_url } })
        .then(() => {
          enqueueSnackbar("Your Name updated successfully!");
          queryClient.invalidateQueries({ queryKey: [useAccountServiceAuthUserinfoQueryKey] });
        })
        .catch(() => {
          enqueueSnackbar("Failed to update avatar!", { variant: "error" });
        });
    }
  };

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="setting" open={true} onClose={back}>
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
          <FormProvider methods={methods} sx={{ gap: 3, width: "100%", mt: 3 }}>
            <InputEditor name="name" label="Full Name" onSave={onSave} />

            <RHFTextField
              name="password"
              label="Password"
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
                    {isMobile ? "Change" : "Change Password"}
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
