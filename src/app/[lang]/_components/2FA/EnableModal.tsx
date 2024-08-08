import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@/components/icons";
import { DialogActions, Divider, IconButton, Typography, Button, DialogContent } from "@mui/material";
import CustomDialog from "@/components/CustomDialog";
import { Stack } from "@mui/material";
import * as Yup from "yup";
import FormProvider from "@/components/hook-form/form-provider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { snipText } from "@/utils/string";
import { RHFCode } from "@/components/hook-form";
import { enqueueSnackbar } from "notistack";
import { useAuthServiceFa, useAuthServiceFaQuery } from "@minecraft/queries";
import { LoadingButton } from "@mui/lab";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/lib/hooks";
import { modifyUser } from "@/lib/features/user/userSlice";
const QRCodeWithIcon = dynamic(() => import("@/components/QRCodeWithIcon"), {
  ssr: false,
  loading: () => <Box sx={{ width: 140, height: 140 }} />,
});
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

export default function EnableModal({ open, close }: FilterDialogProps) {
  const { data: twofaRes } = useAuthServiceFaQuery();

  const { update } = useSession();
  const dispatch = useAppDispatch();
  const { copy } = useCopyToClipboard();
  const handleCopy = () => {
    copy(twofaRes?.data?.secret!);
  };
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
        { requestBody: { enabled: true, otp: data.verifyCode } },
        {
          onSuccess() {
            enqueueSnackbar({ message: "Your 2FA enabled successfully.", variant: "success" });
            dispatch(modifyUser({ has_2fa: true }));
            update({ user: { has_2fa: true } });
            close();
          },
        }
      );
    } catch (_error) {
      enqueueSnackbar({ message: "You’re not connected to the 2FA yet.", variant: "error" });
    }
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="enable-2fa" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="enable-2fa">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">Enable 2FA</Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={3}>
          <Stack gap={2}>
            <Typography variant="p2-regular">
              For added security, please set up Two-Factor Authentication (2FA).
            </Typography>
            <Typography variant="p2-regular">
              Scan the QR code with authentication app and enter the code below.
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={3} alignItems={"center"}>
            <QRCodeWithIcon value={twofaRes?.data?.url!} iconSrc="/logo/logo.svg" size={140} />
            <Stack gap={1}>
              <Typography variant="caption-semi-bold">Secret Key</Typography>
              <Stack
                sx={{ height: 56, borderRadius: "28px", backgroundColor: "dark.3", p: 1, pl: 2 }}
                direction={"row"}
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Typography
                  variant="p2-medium"
                  color="blue.light"
                  pr={2}
                  sx={{ textOverflow: "ellipsis", wordBreak: "break-all", ...snipText(1) }}
                >
                  {twofaRes?.data?.secret}
                </Typography>
                <IconButton onClick={handleCopy} color="primary">
                  <Icon name="Copy" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
            <RHFCode name="verifyCode" label="Authentication Code" loading={isPending} />
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={close}>
            Cancel
          </Button>
          <LoadingButton loading={isPending} type="button" onClick={onSubmit}>
            Verify & Enable
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
}
