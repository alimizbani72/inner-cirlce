// import { useTranslate } from "@/locales";
import { z } from 'zod';

export const useLoginSchema = () => {
  // const { t } = useTranslate();

  return z.object({
    // email: z.string().email(t('errors.invalidEmail')),
    // password: z.string().min(8, t('errors.passwordMinLength')),
    remember: z.boolean().optional(),
  });
};
