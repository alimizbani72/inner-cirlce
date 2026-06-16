import { useTranslate } from "@/locales";
import ContentStack from "@app-components/ContentStack";
import { useState } from "react";
import { toast } from "sonner";
import ConnectedStatus from "./ConnectedStatus";
import CustomButton from "./CustomButton";
import SubscriptionButton from "./SubscriptionButton";

const RenderWhaleContent = () => {
  const { t } = useTranslate();

  // ✅ fake loading
  const [isLoading, setIsLoading] = useState(false);

  // ✅ dummy user
  const userInfo = {
    data: {
      plan: "premium", // change to "basic" to test upgrade
      telegram_group_joined: false,
      telegram_id: "123456789",
    },
  };

  // ✅ simulate plan check
  const needsUpgrade = userInfo.data.plan !== "premium";

  // ✅ fake API: get telegram link
  const fakeGetTelegramLink = () =>
    new Promise<string>((resolve, reject) => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);

        // simulate success or failure
        const success = true;

        if (success) {
          resolve("https://t.me/example_private_group");
        } else {
          reject(new Error("Failed to fetch link"));
        }
      }, 1000);
    });

  const handleJoinClick = async () => {
    try {
      const link = await fakeGetTelegramLink();

      if (link) {
        window.location.href = link;
      } else {
        toast.error(t("formErrors.formError"));
      }
    } catch (_err) {
      toast.error(t("formErrors.unexpectedError"));
    }
  };

  // ✅ loading state
  if (isLoading) {
    return (
      <ContentStack
        className="loading-skeleton"
        sx={{ height: "51px", borderRadius: 4, width: "100%" }}
      />
    );
  }

  // ✅ upgrade required
  if (needsUpgrade) {
    return <SubscriptionButton />;
  }

  // ✅ main UI
  return !userInfo.data.telegram_group_joined ? (
    <CustomButton
      onClick={handleJoinClick}
      buttonText={t("telegramChannel.joinPremiumChatRoom")}
      iconName="LinkIcon"
    />
  ) : (
    <ConnectedStatus telegramId={userInfo.data.telegram_id} />
  );
};

export default RenderWhaleContent;
