"use client";

import { Collapse, IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import Menu from "./Menu";
import { sidebarCommunityItems, sidebarServicesItems } from "@/configs/sidebar";
import SidebarUserInfo from "./UserInfo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed, sidebarToggle } from "@/lib/features/menu/menuSlice";
import LogoType from "@/components/LogoType";
import Logo from "@/components/Logo";
import { Icon } from "@/components/icons";
import UpgradePlan from "../UpgradePlan";
import { useAccountServiceAuthUserinfoQuery } from "@minecraft/queries";

const DesktopSidebar: FC = () => {
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

  const dispatch = useAppDispatch();
  const isCollapsed = useAppSelector(isSidebarCollapsed);

  return (
    <Stack sx={{ position: "relative", display: { md: "flex", xs: "none" } }}>
      <IconButton
        onClick={() => dispatch(sidebarToggle())}
        sx={{
          bgcolor: "dark.3",
          position: "absolute",
          right: "-12px",
          top: "40px",
          transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
          "&:hover": { bgcolor: "dark.3" },
          zIndex: 100,
        }}
        size={"small"}
      >
        <Icon name="Arrow-Left" color="grey.light" />
      </IconButton>

      <Collapse in={!isCollapsed} collapsedSize={104} orientation="horizontal">
        <Stack
          sx={{
            width: isCollapsed ? 104 : 248,
            borderRight: "1.5px solid",
            borderColor: "dark.3",
            backgroundColor: "dark.2",
            height: "100vh",
          }}
        >
          <Stack sx={{ p: 4, borderBottom: "1.5px solid", borderColor: "dark.3", position: "relative", width: "100%" }}>
            {isCollapsed ? <Logo /> : <LogoType />}
          </Stack>

          <Stack py={4} px={isCollapsed ? 3 : 2} gap={4}>
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
            {!isCollapsed && <UpgradePlan />}

            <SidebarUserInfo />
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default DesktopSidebar;
