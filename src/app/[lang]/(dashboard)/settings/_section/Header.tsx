"use client";
import { Icon } from "@/components/icons";
import { getUserPlanType } from "@/consts";
import { useIsMobile } from "@/hooks/use-responsive";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { toTitleCase } from "@/utils/change-case";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import LanguageSelect from "./LangSelector";
import { usePathname } from "next/navigation";
import Link from "@/components/Link";
import { useCallback, useMemo } from "react";
import SectionSelect from "./SectionSelector";

const SettingsHeader = () => {
  const { t } = useTranslate();
  const tabs = useMemo(
    () => [
      { id: "account", icon: "User", link: t("settingTabs.account") },
      { id: "become-partner", icon: "Hand", link: t("settingTabs.become-partner") },
      { id: "billing", icon: "Money", link: t("settingTabs.billing") },
      { id: "business-account", icon: "Star", link: t("settingTabs.business-account") },
    ],
    [t]
  );
  const isMobile = useIsMobile();
  const userInfo = useAppSelector(selectUser);
  const isFreePlan = getUserPlanType(userInfo!) === "plankton";
  const pathname = usePathname();
  const isActive = useCallback((id: string) => pathname.includes(`settings/${id}`), [pathname]);

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
            {tabs
              .filter((t) => (userInfo?.kyc_status ? !t.id.includes("become-partner") : t))
              .map((tab) => (
                <Stack
                  key={tab.id}
                  direction="row"
                  gap={1}
                  component={isActive(tab.id) ? "div" : Link}
                  href={`/settings/${tab.id}`}
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: "20px",
                    border: "1px solid",
                    color: "transparent",
                    ...(isActive(tab.id)
                      ? {
                          borderColor: "dark.2",
                          bgcolor: "dark.3",
                          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
                        }
                      : {
                          "svg path": { stroke: "rgb(151, 153, 180)" },
                        }),
                  }}
                >
                  <Icon name={`${tab.icon}${isActive(tab.id) ? "--colorful" : ""}` as any} />
                  <Typography variant="p2-medium" color={isActive(tab.id) ? "white" : "grey.light"}>
                    {tab.link}
                  </Typography>
                </Stack>
              ))}
          </Stack>
        )}
        <LanguageSelect />
      </Stack>
    </Stack>
  );
};

export default SettingsHeader;
