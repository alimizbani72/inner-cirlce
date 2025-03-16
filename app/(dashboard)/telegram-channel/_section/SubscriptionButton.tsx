import Icon from '@/components/icon';
import { useTranslate } from '@/locales';
import { Button } from '@mui/material';
const buttonStyle = {
  position: 'relative',
  zIndex: 1,
  border: '1.5px solid',
  textWrap: 'nowrap',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '30%',
    bottom: 0,
    background:
      'radial-gradient(50% 50% at 50% 50%, rgba(255, 260, 128, 0.64) 0%, rgba(255, 196, 64, 0.64) 20%)',
    filter: 'blur(50px)',
    zIndex: -1,
  },
};
const SubscriptionButton = () => {
  const { t } = useTranslate();
  return (
    <Button
      color="tertiary"
      size="large"
      sx={buttonStyle}
      href="/pricing"
      startIcon={<Icon name="SubscriptionIcon" fill="warning.main" />}
    >
      {t('telegramChannel.joinPremiumChatRoom')}
    </Button>
  );
};

export default SubscriptionButton;
