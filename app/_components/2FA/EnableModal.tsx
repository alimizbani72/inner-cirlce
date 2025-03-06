import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@/components/icon';
import {
  DialogActions,
  Divider,
  IconButton,
  Typography,
  Button,
  DialogContent,
} from '@mui/material';
import CustomDialog from '@/components/CustomDialog';
import { Stack } from '@mui/material';
import zod from 'zod';
import FormProvider from '@/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { snipText } from '@/utils/string';
import { RHFCode } from '@/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '@/lib/hooks';
import { modifyUser } from '@/lib/features/user/userSlice';
import { getGetMeQueryKey, useGet2fa, usePatch2fa } from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import { getQueryClient } from '@/app/_providers/customQueryClient';
const QRCodeWithIcon = dynamic(() => import('@/components/QRCodeWithIcon'), {
  ssr: false,
  loading: () => <Box sx={{ width: 140, height: 140 }} />,
});
const UpdateUserSchema = zod.object({
  verifyCode: zod.string().nonempty('The value is wrong, try again.'),
});

const defaultValues = {
  verifyCode: '',
};

type FilterDialogProps = {
  open: boolean;
  close: VoidFunction;
};

export default function EnableModal({ open, close }: FilterDialogProps) {
  const { data: twofaRes } = useGet2fa();
  const queryClient = getQueryClient();

  const dispatch = useAppDispatch();
  const { copy } = useCopyToClipboard();
  const handleCopy = () => {
    copy(twofaRes?.data?.secret!);
  };
  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    mode: 'onSubmit',
  });
  const { mutateAsync, isPending } = usePatch2fa();

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(
        { data: { enabled: true, otp: data.verifyCode } },
        {
          onSuccess() {
            toast.success('Your 2FA enabled successfully.');
            dispatch(modifyUser({ has_2fa: true }));

            queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
            close();
          },
        }
      );
    } catch (_error) {
      toast.error('You’re not connected to the 2FA yet.');
    }
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="enable-2fa" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="enable-2fa">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">Enable 2FA</Typography>
          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
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
          <Stack direction={'row'} gap={3} alignItems={'center'}>
            <QRCodeWithIcon value={twofaRes?.data?.url!} iconSrc="/logo/logo.svg" size={140} />
            <Stack gap={1}>
              <Typography variant="caption-semi-bold">Secret Key</Typography>
              <Stack
                sx={{ height: 56, borderRadius: '28px', backgroundColor: 'dark.3', p: 1, pl: 2 }}
                direction={'row'}
                alignItems={'center'}
                justifyContent="space-between"
              >
                <Typography
                  variant="p2-medium"
                  color="blue.light"
                  pr={2}
                  sx={{ textOverflow: 'ellipsis', wordBreak: 'break-all', ...snipText(1) }}
                >
                  {twofaRes?.data?.secret}
                </Typography>
                <IconButton onClick={handleCopy} color="primary">
                  <Icon name="CopyIcon" />
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
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <Button color="tertiary" onClick={close}>
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
