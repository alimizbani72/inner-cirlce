import { useTranslate } from '@/locales';

const ErrorPage = () => {
  const { t } = useTranslate();
  return (
    <div>
      <h1>{t('login.loginError')}</h1>
      <p>{t('login.AnErrorOccurred')}</p>
    </div>
  );
};

export default ErrorPage;
