// import { useTranslate } from "@/locales";
import { z } from 'zod';

export const useForgotPassSchema = () => {
  // const { t } = useTranslate();

  return z
    .object({
      // email: z.string().email(t('errors.fullNameRequired')),
      password: z
        .string()
        .optional()
        .transform((val) => (val === '' ? undefined : val))
        .pipe(
          z
            .string()
            // .min(8, t('errors.passwordMinLength'))
            // .regex(/[A-Z]/, t('errors.passwordUppercase'))
            // .regex(/[0-9]/, t('errors.passwordNumber'))
            // .regex(/[^A-Za-z0-9]/, t('errors.passwordSpecial'))
            .optional()
        ),
      confirmPassword: z.string().optional(),
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
      token: z.string().optional(),
      step: z.enum(['forgot', 'otp', 'reset']).default('forgot'),
    })
    .refine(
      (data) => {
        if (data.step === 'reset') {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      }
    )
    .refine(
      (data) => {
        if (data.step === 'otp') {
          return !!data.otp;
        }
        return true;
      },
      {
        // message: t("errors.otpLength"),
        path: ['otp'],
      }
    );
};
