"use client";
import Icon from "@/components/icon";
import { getUserPlanType } from "@/consts";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import { toTitleCase } from "@/utils/change-case";
import LanguageSelect from "@app-components/LangSelector";
import { Box, Button, Stack, Typography, selectClasses } from "@mui/material";
import DesktopTabs from "./DesktopTabs";
import SectionSelect from "./SectionSelector";
import UserInfo from "./UserInfo";

const tabs = [
  { link: "account", icon: "User", title: "settingTabs.account" },
  { link: "become-partner", icon: "Hand", title: "settingTabs.become-partner" },
  { link: "billing", icon: "Money", title: "settingTabs.billing" },
  {
    link: "business-account",
    icon: "Star",
    title: "settingTabs.business-account",
  },
];

const SettingsHeader = () => {
  const { t } = useTranslate();

  const isMobile = useIsMobile();
  const { data, isLoading } = useGetMe();
  const userInfo = data?.data;
  const isFreePlan = getUserPlanType(userInfo!) === "plankton";

  return (
    <Stack>
      <Stack
        direction={{ md: "row" }}
        justifyContent={"space-between"}
        alignItems={{ md: "center" }}
        sx={{
          py: 3,
          px: { md: 4, xs: 3 },
          bgcolor: "dark.2",
          borderBottom: "1.5px solid",
          borderColor: "dark.3",
        }}
        gap={2}
      >
        <UserInfo />

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={2}
        >
          {isLoading ? (
            <Box
              component={"span"}
              className="loading-skeleton"
              sx={{ borderRadius: 4, width: "150px", height: "20px" }}
            />
          ) : (
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              <Icon
                name={isFreePlan ? "WarningIcon" : "SubscriptionIcon"}
                fill={isFreePlan ? undefined : "warning.main"}
                size={32}
              />
              <Typography variant="p2-semi-bold">
                {isFreePlan
                  ? t("userInfo.noMembership")
                  : toTitleCase(getUserPlanType(userInfo))}
                <Typography component={"span"} variant="p2-regular">
                  {t("userInfo.membershipSuffix")}
                </Typography>
              </Typography>
            </Stack>
          )}
          {getUserPlanType(userInfo) !== "fisherman_plus" && (
            <Button sx={{ ml: isMobile ? "none" : "auto" }} href="/pricing">
              {t("userInfo.upgradeButton")}
            </Button>
          )}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          py: 3,
          px: { md: 4, xs: 3 },
          borderBottom: "1.5px solid",
          borderColor: "dark.3",
        }}
        gap={2}
      >
        {isMobile ? (
          <SectionSelect tabs={tabs} />
        ) : (
          <Stack direction="row">
            {tabs.map((tab) => (
              <DesktopTabs
                key={tab.link}
                icon={tab.icon}
                href={tab.link}
                title={t(tab.title as any)}
              />
            ))}
          </Stack>
        )}
        <LanguageSelect
          sx={{
            border: "1.5px solid",
            borderColor: "dark.3",
            width: isMobile ? "120px" : "164px",
            ...(isMobile && {
              [`& .${selectClasses.select} div span`]: {
                display: "none",
              },
            }),
          }}
        />
      </Stack>
    </Stack>
  );
};

export default SettingsHeader;
