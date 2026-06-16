import CustomDialog from "@/components/CustomDialog";
import { RHFCode } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import Icon from "@/components/icon";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { modifyUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { snipText } from "@/utils/string";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import zod from "zod";

const QRCodeWithIcon = dynamic(() => import("@/components/QRCodeWithIcon"), {
  ssr: false,
  loading: () => <Box sx={{ width: 140, height: 140 }} />,
});

const UpdateUserSchema = zod.object({
  verifyCode: zod.string().nonempty("The value is wrong, try again."),
});

const defaultValues = {
  verifyCode: "",
};

type FilterDialogProps = {
  open: boolean;
  close: VoidFunction;
};

export default function EnableModal({ open, close }: FilterDialogProps) {
  const dispatch = useAppDispatch();
  const { copy } = useCopyToClipboard();

  // ✅ DUMMY DATA (no API)
  const twofaRes = {
    data: {
      url: "otpauth://totp/demo-app?secret=DEMOSECRET123",
      secret: "DEMOSECRET123",
    },
  };

  const handleCopy = () => {
    copy(twofaRes.data.secret);
    toast.success("Copied");
  };

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async () => {
    toast.success("2FA enabled successfully (mock)");
    dispatch(modifyUser({ has_2fa: true }));
    close();
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4-semi-bold">Enable 2FA (Mock)</Typography>
          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Stack gap={3}>
          <Typography>
            Scan QR code and enter the authentication code.
          </Typography>

          <Stack direction="row" gap={3} alignItems="center">
            <QRCodeWithIcon
              value={twofaRes.data.url}
              iconSrc="/logo/logo.svg"
              size={140}
            />

            <Stack gap={1}>
              <Typography variant="caption-semi-bold">Secret Key</Typography>

              <Stack
                sx={{
                  height: 56,
                  borderRadius: "28px",
                  backgroundColor: "dark.3",
                  p: 1,
                  pl: 2,
                }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="p2-medium"
                  color="blue.light"
                  sx={{ ...snipText(1) }}
                >
                  {twofaRes.data.secret}
                </Typography>

                <IconButton onClick={handleCopy}>
                  <Icon name="CopyIcon" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>

          <FormProvider methods={methods} onSubmit={onSubmit}>
            <RHFCode name="verifyCode" label="Authentication Code" />
          </FormProvider>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Button onClick={close} color="tertiary">
            Cancel
          </Button>

          <LoadingButton onClick={onSubmit}>Verify & Enable</LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
}
