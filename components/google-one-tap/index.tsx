'use client';

import { signInGoogle } from '@/auth';
import { toast } from '@/components/snackbar';
import { useTranslate } from '@/locales';
import { useAppRouter } from '@/routes/hooks';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { usePathname } from 'next/navigation';

const GoogleOneTap = () => {
  const { t } = useTranslate();
  const router = useAppRouter();
  const pathName = usePathname();
  const isAllow = ['/login', '/register'].includes(pathName);

  useGoogleOneTapLogin({
    disabled: !isAllow,
    auto_select: false,
    cancel_on_tap_outside: false,
    onError: () => {
      toast.error(t('formErrors.somethingWentWrong'));
    },
    onSuccess: async (credentialResponse) => {
      try {
        await signInGoogle({
          token: credentialResponse.credential!,
        });
        router.push('/');
      } catch (_error) {
        toast.error(t('formErrors.somethingWentWrong'));
      }
    },
  });

  return <></>;
};

export default GoogleOneTap;
