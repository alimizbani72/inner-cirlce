// import { useTranslate } from "@/locales";
import { z } from 'zod';

export const useSignUpSchema = () => {
  // const { t } = useTranslate();

  return z
    .object({
      // fullName: z.string().min(1, t('errors.fullNameRequired')),
      // email: z.string().email(t('errors.invalidEmail')),
      password: z
        .string()
        // .min(8, t('errors.passwordMinLength'))
        // .regex(/[A-Z]/, t('errors.passwordUppercase'))
        // .regex(/[0-9]/, t('errors.passwordNumber'))
        .regex(/[!@#$%^&*(),.?":{}|<>]/, ''),
      otp: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val))
        .pipe(
          z
            .string()
            // .length(6, t('errors.otpLength'))
            // .regex(/^\d+$/, t('errors.otpNumbers'))
            .optional()
        ),
      terms: z.boolean().refine((value) => value === true, {
        // message: t('errors.termsRequired'),
      }),
      step: z.enum(['credential', 'otp']).default('credential'),
    })
    .refine(
      (data) => {
        if (data.step === 'otp') {
          return !!data.otp;
        }
        return true;
      },
      {
        // message: t('errors.otpLength'),
        path: ['otp'],
      }
    );
};
