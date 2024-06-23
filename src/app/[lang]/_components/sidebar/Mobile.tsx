"use client";

import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import LogoType from "@/components/LogoType";
import Menu from "./Menu";
import SidebarUserInfo from "./UserInfo";
import { sidebarCommunityItems, sidebarServicesItems } from "@/configs/sidebar";
import { Icon } from "@/components/icons";
import { useAppDispatch } from "@/lib/hooks";
import { mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import UpgradePlan from "../UpgradePlan";
import { useAccountServiceAuthUserinfoQuery } from "@minecraft/queries";

const MobileSidebar: FC = () => {
  const dispatch = useAppDispatch();
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <Stack
        bgcolor={"dark.1"}
        p={3}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
      >
        <IconButton sx={{ position: "absolute", left: 24 }} onClick={() => dispatch(mobileMenuToggle(false))}>
          <Icon name="Close" />
        </IconButton>

        <LogoType />
      </Stack>

      <Stack py={4} px={2} gap={4}>
        <Menu name="Services" items={sidebarServicesItems} />
        {sidebarCommunityItems.length && (
          <Menu
            name="Community"
            items={sidebarCommunityItems.filter((item) =>
              (userInfo as any)?.data?.kyc_status ? item : !item.path.includes("affiliate")
            )}
          />
        )}
      </Stack>

      <Stack mt={"auto"} gap={3}>
        <UpgradePlan />

        <SidebarUserInfo />
      </Stack>
    </Stack>
  );
};

export default MobileSidebar;
