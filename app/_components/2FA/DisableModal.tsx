import Icon from '@/components/icon';
import { Typography, Button, DialogContent } from '@mui/material';
import CustomDialog from '@/components/CustomDialog';
import { Stack } from '@mui/material';
import zod from 'zod';
import FormProvider from '@/components/hook-form/form-provider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RHFCode } from '@/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '@/lib/hooks';
import { modifyUser } from '@/lib/features/user/userSlice';
import { getGetMeQueryKey, usePatch2fa } from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import { getQueryClient } from '@/app/_providers/customQueryClient';

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

export default function DisableModal({ open, close }: FilterDialogProps) {
  const dispatch = useAppDispatch();
  const queryClient = getQueryClient();
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
        { data: { enabled: false, otp: data.verifyCode } },
        {
          onSuccess() {
            toast.success('Your 2FA disabled successfully.');
            dispatch(modifyUser({ has_2fa: false }));
            queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
            close();
          },
        }
      );
    } catch (_error) {
      toast.error('Something is wrong! please try again');
    }
  });

  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="enable-2fa" open={open}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={2} justifyContent={'center'} alignItems={'center'}>
          <Icon name="PasswordIcon" size={64} />
          <Stack gap={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h3-semi-bold">Are you sure you want to disable 2FA?</Typography>
            <Typography variant="p2-regular">
              Enter the Two-factory authentication code to confirm your request.
            </Typography>
          </Stack>
          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ mt: 1 }}>
            <RHFCode name="verifyCode" label="Authentication Code" loading={isPending} />
          </FormProvider>
          <Stack
            direction={'row'}
            gap={2}
            sx={{ mt: 2 }}
            width={'100%'}
            justifyContent={'space-between'}
          >
            <Button color="tertiary" onClick={close}>
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
