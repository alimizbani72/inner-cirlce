'use client';

import CustomDialog from '@/components/CustomDialog';
import DialogContent from '@mui/material/DialogContent';
import { Button, DialogActions, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { useTranslate } from '@/locales';
import FormProvider from '@/components/hook-form/form-provider';
import { RHFCode } from '@/components/hook-form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twoFASubmitterOTPSet } from '@/lib/features/two-fa-submitter/twoFASubmitterSlice';
import { useAppDispatch } from '@/lib/hooks';
import Icon from '@/components/icon';

type Props = {
  close: VoidFunction;
  open: boolean;
};

const FormSchema = z.object({
  verifyCode: z.string().nonempty({ message: 'The value is wrong, try again.' }),
});

type FormValues = z.infer<typeof FormSchema>;

const defaultValues: FormValues = {
  verifyCode: '',
};
const TwoFASubmitterDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();

  const methods = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    dispatch(twoFASubmitterOTPSet(data.verifyCode));
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="xs"
      onClose={close}
      aria-labelledby="two-fa-submitter-dialog"
      open={open}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack alignItems="center">
          <Icon name="PasswordIcon" size={64} />
          <Typography mt={2} variant="h3-semi-bold">
            Please enter 2FA code
          </Typography>

          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
            <RHFCode name="verifyCode" label="Authentication Code" />
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} gap={2}>
          <Button size="large" fullWidth color="tertiary" onClick={close}>
            {t('button.cancel')}
          </Button>
          <Button size="large" fullWidth onClick={onSubmit}>
            {t('button.verify')}
          </Button>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TwoFASubmitterDialog;
