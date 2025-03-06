'use client';
import { useTranslate } from '@/locales';
import TelegramLayoutCard from './TelegramLayoutCard';
import RenderWhaleContent from './RenderWhaleContent';

const WhaleCard = () => {
  const { t } = useTranslate();

  return (
    <TelegramLayoutCard
      title={t('telegramChannel.exclusiveWhaleChannel')}
      features={[
        t('telegramChannel.realTimeMarketInsights'),
        t('telegramChannel.directCommunication'),
      ]}
      description={t('telegramChannel.joinPremiumTelegramChannel')}
      bgImage="/assets/png/telegrambgpink.png"
      content={<RenderWhaleContent />}
      premium={t('telegramChannel.premium')}
      planTypeImg="/assets/rive/whale_animation.riv"
    />
  );
};

export default WhaleCard;
