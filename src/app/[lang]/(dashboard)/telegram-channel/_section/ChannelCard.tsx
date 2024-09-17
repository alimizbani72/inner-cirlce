"use client";
import TelegramLink from "./TelegramLink";
import { useTranslate } from "@/locales";
import TelegramLayoutCard from "./TelegramLayoutCard";
import CustomButton from "./CustomButton";
import { useState } from "react";

const ChannelCard = () => {
  const { t } = useTranslate();
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLink = async () => {
    setLoading(true);
    setTimeout(() => {
      setIsLinkVisible(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <TelegramLayoutCard
      title={t("telegramChannel.chainmindChannel")}
      features={[t("telegramChannel.realTimeMarketInsights"), t("telegramChannel.directCommunication")]}
      description={t("telegramChannel.unlockaccessMessage")}
      bgImage="/assets/png/telegrambggray.png"
      content={
        isLinkVisible ? (
          <TelegramLink />
        ) : (
          <CustomButton
            loading={loading}
            onClick={fetchLink}
            buttonText={t("telegramChannel.joinOurPublicChatRoom")}
            iconName="Link"
          />
        )
      }
    />
  );
};

export default ChannelCard;
