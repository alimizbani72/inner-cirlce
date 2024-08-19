import { Icon } from "@/components/icons";
import { Typography, Button, DialogContent } from "@mui/material";
import CustomDialog from "@/components/CustomDialog";
import { Stack } from "@mui/material";
import * as Yup from "yup";
import FormProvider from "@/components/hook-form/form-provider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFCode } from "@/components/hook-form";
import { enqueueSnackbar } from "notistack";
import { useAuthServiceFa } from "@minecraft/queries";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { modifyUser } from "@/lib/features/user/userSlice";

const UpdateUserSchema = Yup.object().shape({
  verifyCode: Yup.string().required("The value is wrong, try again."),
});

const defaultValues = {
  verifyCode: "",
};

type FilterDialogProps = {
  open: boolean;
  close: VoidFunction;
};

export default function DisableModal({ open, close }: FilterDialogProps) {
  const dispatch = useAppDispatch();
  const { update } = useSession();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });
  const { mutateAsync, isPending } = useAuthServiceFa();

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(
        { requestBody: { enabled: false, otp: data.verifyCode } },
        {
          onSuccess() {
            enqueueSnackbar({ message: "Your 2FA disabled successfully.", variant: "success" });
            dispatch(modifyUser({ has_2fa: false }));
            update({ user: { has_2fa: false } });
            close();
          },
        }
      );
    } catch (_error) {
      enqueueSnackbar({ message: "Something is wrong! please try again", variant: "error" });
    }
  });

  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="enable-2fa" open={open}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={2} justifyContent={"center"} alignItems={"center"}>
          <Icon name="Password--colorful" size={64} />
          <Stack gap={1} sx={{ textAlign: "center" }}>
            <Typography variant="h3-semi-bold">Are you sure you want to disable 2FA?</Typography>
            <Typography variant="p2-regular">
              Enter the Two-factory authentication code to confirm your request.
            </Typography>
          </Stack>
          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ mt: 1 }}>
            <RHFCode name="verifyCode" label="Authentication Code" loading={isPending} />
          </FormProvider>
          <Stack direction={"row"} gap={2} sx={{ mt: 2 }} width={"100%"} justifyContent={"space-between"}>
            <Button color="info" onClick={close}>
              No, Cancel
            </Button>
            <LoadingButton loading={isPending} type="button" onClick={onSubmit} color="secondary">
              Yes, Disable
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
}
