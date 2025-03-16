'use client';

import { RHFTextField } from '@/components/hook-form';
import Icon from '@/components/icon';
import { useIsMobile } from '@/hooks/use-responsive';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import UserProfile from './UserProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import zod from 'zod';
import { getGetMeQueryKey, useGetMe, usePatchMe } from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import FormProvider from '@/components/hook-form/form-provider';
import InputEditor from '@app-components/InputEditor';
import TwoFA from '@app-components/2FA';
import { useEffect } from 'react';
import { getQueryClient } from '@/app/_providers/customQueryClient';
import ContentStack from '@app-components/ContentStack';

const SettingsSection = () => {
  const { data: userInfo, isLoading } = useGetMe();
  const queryClient = getQueryClient();

  const { mutateAsync } = usePatchMe();
  const { push } = useAppRouter();
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const UpdateUserSchema = zod.object({
    name: zod
      .string()
      .nonempty(t('settingsDialog.nameRequired'))
      .refine((val) => !/\d/.test(val), t('settingsDialog.invalidCharacter')),
  });
  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: { name: '', email: '' },
    mode: 'onSubmit',
  });

  const { watch, setValue } = methods;
  const { name } = watch();

  const onSave = async () => {
    if (name !== userInfo?.data?.full_name) {
      mutateAsync({ data: { full_name: name } })
        .then(() => {
          toast.success(t('settingsDialog.nameUpdateSuccess'));
          queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
        })
        .catch(() => {
          toast.error(t('settingsDialog.nameUpdateFailed'));
        });
    }
  };

  useEffect(() => {
    if (userInfo?.data) {
      setValue('name', userInfo?.data?.full_name || '');
      setValue('email', userInfo?.data?.email || '');
    }
  }, [userInfo?.data]);

  return (
    <Stack justifyContent="center" alignItems="center" p={{ sm: 4, xs: 2 }} gap={{ sm: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          {t('settingsDialog.account')}
        </Typography>
      </Stack>

      <Stack justifyContent="center" alignItems="center">
        {isLoading ? (
          <ContentStack
            className="loading-skeleton"
            sx={{ height: { md: '130px', xs: '169px' }, width: '100%' }}
          />
        ) : (
          <UserProfile />
        )}

        <FormProvider methods={methods} sx={{ gap: 3, width: '100%', mt: 3 }}>
          <InputEditor name="name" label={t('settingsDialog.fullName')} onSave={onSave} />

          <RHFTextField
            name="email"
            label={t('settingsDialog.email')}
            type="email"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </FormProvider>

        <Stack
          width={1}
          mt={3}
          direction={{ md: 'row' }}
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={() => push('/settings/account/change-password')}
            startIcon={<Icon name="MoreRoundIcon" />}
            sx={{ whiteSpace: 'pre' }}
            fullWidth
            size="large"
            color="tertiary"
          >
            {isMobile ? t('settingsDialog.change') : t('settingsDialog.changePassword')}
          </Button>

          <TwoFA isEnable={!!userInfo?.data?.has_2fa} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SettingsSection;
