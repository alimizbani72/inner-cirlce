// import { useTranslate } from "@/locales";
// ----------------------------------------------------------------------

export type usePasswordValidationReturn = string[];

export function usePasswordValidation(
  password: string
  // isTouched: boolean
): usePasswordValidationReturn {
  // const { t } = useTranslate();

  const errors: string[] = [];

  // if (!password && isTouched) {
  //   return [
  //     t('errors.passwordMinLength'),
  //     t('errors.passwordUppercase'),
  //     t('errors.passwordNumber'),
  //     t('errors.passwordSpecial'),
  //   ];
  // }

  if (!password) {
    return errors;
  }

  // if (password.length < 8) {
  //   errors.push(t('errors.passwordMinLength'));
  // }
  // if (!/[A-Z]/.test(password)) {
  //   errors.push(t('errors.passwordUppercase'));
  // }
  // if (!/[0-9]/.test(password)) {
  //   errors.push(t('errors.passwordNumber'));
  // }
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //   errors.push(t('errors.passwordSpecial'));
  // }

  return errors;
}
