"use client";

import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import LogoType from "@/components/LogoType";
import Menu from "./Menu";
import SidebarUserInfo from "./UserInfo";
import { sidebarCommunityItems, sidebarServicesItems } from "@/configs/sidebar";
import { Icon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import UpgradePlan from "../UpgradePlan";
import { useTranslate } from "@/locales";
import { selectUser } from "@/lib/features/user/userSlice";

const MobileSidebar: FC = () => {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);

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
        <IconButton sx={{ position: "absolute", left: 24 }} onClick={() => dispatch(mobileMenuToggle(false))}>
          <Icon name="Close" />
        </IconButton>

        <LogoType />
      </Stack>

      <SidebarUserInfo />

      <Stack py={4} px={2} gap={4}>
        <Menu name={t("sidebar.services")} items={sidebarServicesItems} />
        {sidebarCommunityItems.filter((item) => (userInfo?.kyc_status ? item : !item.path.includes("affiliate")))
          .length && (
          <Menu
            name={t("sidebar.community")}
            items={sidebarCommunityItems.filter((item) =>
              userInfo?.kyc_status ? item : !item.path.includes("affiliate")
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
