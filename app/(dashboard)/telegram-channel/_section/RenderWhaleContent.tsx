import { useTranslate } from '@/locales';
import { useGetTelegramLink } from '@/services/minecraft/telegram/telegram';
import { toast } from 'sonner';
import SubscriptionButton from './SubscriptionButton';
import ContentStack from '@app-components/ContentStack';
import CustomButton from './CustomButton';
import ConnectedStatus from './ConnectedStatus';
import { useGetMe } from '@/services/minecraft/auth/auth';
import { plans } from '@/configs/plans';
import { getUserPlanType } from '@/consts';

const RenderWhaleContent = () => {
  const { t } = useTranslate();
  const { refetch, isLoading } = useGetTelegramLink({
    query: {
      retry: 0,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  });

  const { data: userInfo } = useGetMe();
  const needsUpgrade = plans[getUserPlanType(userInfo?.data) as keyof typeof plans]?.order < 6;

  const handleJoinClick = async () => {
    try {
      const result = await refetch();

      if (result?.data?.data) {
        window.location.href = result.data.data;
      } else if (result.error) {
        toast.error(t('formErrors.formError'));
      }
    } catch (_err) {
      toast.error(t('formErrors.unexpectedError'));
    }
  };

  if (isLoading) {
    return (
      <ContentStack
        className="loading-skeleton"
        sx={{ height: '51px', borderRadius: 4, width: '100%' }}
      />
    );
  }

  if (needsUpgrade) {
    return <SubscriptionButton />;
  }

  return !userInfo?.data?.telegram_group_joined ? (
    <CustomButton
      onClick={handleJoinClick}
      buttonText={t('telegramChannel.joinPremiumChatRoom')}
      iconName="LinkIcon"
    />
  ) : (
    <ConnectedStatus telegramId={userInfo?.data?.telegram_id} />
  );
};

export default RenderWhaleContent;
