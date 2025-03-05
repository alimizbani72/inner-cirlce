"use client";
import { useTranslate } from "@/locales";
import CustomButton from "./CustomButton";
import TelegramLayoutCard from "./TelegramLayoutCard";

const ChannelCard = () => {
  const { t } = useTranslate();

  const telLinkAddress = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL || "";
  return (
    <TelegramLayoutCard
      title={t("telegramChannel.chainmindChannel")}
      features={[t("telegramChannel.realTimeMarketInsights"), t("telegramChannel.directCommunication")]}
      description={t("telegramChannel.unlockaccessMessage")}
      bgImage="/assets/png/telegrambggray.png"
      content={
        <CustomButton buttonText={t("telegramChannel.joinOurPublicChatRoom")} iconName="Link" href={telLinkAddress} />
      }
    />
  );
};

export default ChannelCard;
