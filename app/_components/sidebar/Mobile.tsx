"use client";

import LogoType from "@/components/LogoType";
import Icon from "@/components/icon";
import { sidebarCommunityItems, sidebarServicesItems } from "@/configs/sidebar";
import { mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import UpgradePlan from "../UpgradePlan";
import Menu from "./Menu";
import SidebarUserInfo from "./UserInfo";

const MobileSidebar: FC = () => {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const { data: userInfo } = useGetMe();

  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <Stack
        bgcolor={"dark.1"}
        p={3}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
        borderBottom={"1.5px solid"}
        borderColor={"dark.3"}
      >
        <IconButton
          sx={{ position: "absolute", left: 24 }}
          onClick={() => dispatch(mobileMenuToggle(false))}
        >
          <Icon name="CloseIcon" />
        </IconButton>

        <LogoType />
      </Stack>

      <SidebarUserInfo />

      <Stack py={4} px={2} gap={4}>
        <Menu name={t("sidebar.services")} items={sidebarServicesItems} />
        {sidebarCommunityItems.filter((item) =>
          userInfo?.data?.kyc_status
            ? item
            : !item?.items?.some((i) => i.path?.includes("affiliate")),
        ).length && (
          <Menu
            name={t("sidebar.community")}
            items={sidebarCommunityItems.filter((item) =>
              userInfo?.data?.kyc_status
                ? item
                : !item?.items?.some((i) => i.path?.includes("affiliate")),
            )}
          />
        )}
      </Stack>

      <Stack mt={"auto"} mb={4} gap={3}>
        <UpgradePlan />
      </Stack>
    </Stack>
  );
};

export default MobileSidebar;
