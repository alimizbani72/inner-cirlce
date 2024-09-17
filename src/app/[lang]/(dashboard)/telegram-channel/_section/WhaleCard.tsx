"use client";
import { Icon } from "@/components/icons";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import ConnectedStatus from "./ConnectedStatus";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { getUserPlanType } from "@/consts";
import TelegramLayoutCard from "./TelegramLayoutCard";
import { useCallback } from "react";
import CustomButton from "./CustomButton";
import { useSnackbar } from "notistack";
import { useTelegramServiceTelegramLinkQuery } from "@minecraft/queries";
const buttonStyle = {
  position: "relative",
  zIndex: 1,
  border: "1.5px solid",
  borderColor: (theme: any) => theme.palette.warning.main,
  textWrap: "nowrap",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "20%",
    right: "30%",
    bottom: 0,
    background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 260, 128, 0.64) 0%, rgba(255, 196, 64, 0.64) 20%)",
    filter: "blur(50px)",
    zIndex: -1,
  },
};
const WhaleCard = () => {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const { refetch, isLoading } = useTelegramServiceTelegramLinkQuery(undefined, {
    enabled: false,
  });
  const userInfo = useAppSelector(selectUser);
  const isNotUpgraded = getUserPlanType(userInfo) !== "whale";

  const handleJoinClick = async () => {
    try {
      const result = await refetch();

      if (result?.data?.data) {
        window.location.href = result.data.data;
      } else if (result.error) {
        enqueueSnackbar(t("formErrors.formError"), {
          variant: "error",
        });
      }
    } catch (_err) {
      enqueueSnackbar(t("formErrors.unexpectedError"), {
        variant: "error",
      });
    }
  };

  const renderSubscriptionButton = useCallback(
    () => (
      <Button color="info" size="large" sx={buttonStyle} href="/pricing">
        <Box pr={1} sx={{ fill: (theme) => theme.palette.warning.main }}>
          <Icon name="Subscription--colorful" />
        </Box>
        {t("telegramChannel.joinPremiumChatRoom")}
      </Button>
    ),
    [t]
  );

  const renderContent = () => {
    if (isNotUpgraded) {
      return renderSubscriptionButton();
    }

    return !userInfo?.telegram_group_joined ? (
      <CustomButton
        onClick={handleJoinClick}
        loading={isLoading}
        buttonText={t("telegramChannel.joinOurPublicChatRoom")}
        iconName="Link"
      />
    ) : (
      <ConnectedStatus telegramId={userInfo?.telegram_id} />
    );
  };

  return (
    <TelegramLayoutCard
      title={t("telegramChannel.exclusiveWhaleChannel")}
      features={[t("telegramChannel.realTimeMarketInsights"), t("telegramChannel.directCommunication")]}
      description={t("telegramChannel.joinPremiumTelegramChannel")}
      bgImage="/assets/png/telegrambgpink.png"
      content={renderContent()}
      premium={t("telegramChannel.premium")}
      planTypeImg="/assets/rive/whale_animation.riv"
    />
  );
};

export default WhaleCard;
