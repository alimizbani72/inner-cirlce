"use client";
import { Icon } from "@/components/icons";
import { getUserPlanType } from "@/consts";
import { useIsMobile } from "@/hooks/use-responsive";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { toTitleCase } from "@/utils/change-case";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import DesktopTabs from "./DesktopTabs";
import LanguageSelect from "./LangSelector";
import SectionSelect from "./SectionSelector";

const tabs = [
  { link: "account", icon: "User", title: "settingTabs.account" },
  { link: "become-partner", icon: "Hand", title: "settingTabs.become-partner" },
  { link: "billing", icon: "Money", title: "settingTabs.billing" },
  { link: "business-account", icon: "Star", title: "settingTabs.business-account" },
];

const SettingsHeader = () => {
  const { t } = useTranslate();

  const isMobile = useIsMobile();
  const userInfo = useAppSelector(selectUser);
  const isFreePlan = getUserPlanType(userInfo!) === "plankton";

  return (
    <Stack>
      <Stack
        direction={{ md: "row" }}
        justifyContent={"space-between"}
        alignItems={{ md: "center" }}
        sx={{ py: 3, px: { md: 4, xs: 3 }, bgcolor: "dark.2", borderBottom: "1.5px solid", borderColor: "dark.3" }}
        gap={2}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Avatar sx={{ width: 56, height: 56 }} src={userInfo?.avatar_url}>
            {userInfo?.full_name?.at(0)}
          </Avatar>
          <Stack>
            <Typography variant="p2-semi-bold" color="common.white">
              {userInfo?.full_name}
            </Typography>
            <Typography variant="caption-medium" color="grey.light">
              {userInfo?.email}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} flexWrap={"wrap"} gap={2}>
          <Stack spacing={1} direction={"row"} alignItems={"center"}>
            <Icon
              name={isFreePlan ? "Warning--colorful" : "Subscription--colorful"}
              color={isFreePlan ? undefined : "warning.main"}
              size={32}
            />
            <Typography variant="p2-semi-bold">
              {isFreePlan ? t("userInfo.noMembership") : toTitleCase(getUserPlanType(userInfo))}
              <Typography component={"span"} variant="p2-regular">
                {t("userInfo.membershipSuffix")}
              </Typography>
            </Typography>
          </Stack>

          {getUserPlanType(userInfo) !== "whale" && (
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
        sx={{ py: 3, px: { md: 4, xs: 3 }, borderBottom: "1.5px solid", borderColor: "dark.3" }}
        gap={2}
      >
        {isMobile ? (
          <SectionSelect tabs={tabs} />
        ) : (
          <Stack direction="row">
            {tabs.map((tab) => (
              <DesktopTabs key={tab.link} icon={tab.icon} href={tab.link} title={t(tab.title as any)} />
            ))}
          </Stack>
        )}
        <LanguageSelect />
      </Stack>
    </Stack>
  );
};

export default SettingsHeader;
