"use client";

import Logo from "@/components/Logo";
import LogoType from "@/components/LogoType";
import Icon from "@/components/icon";
import { Scrollbar } from "@/components/scrollbar";
import { sidebarCommunityItems, sidebarServicesItems } from "@/configs/sidebar";
import useToggleState from "@/hooks/use-toggle-state";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import UpgradePlan from "@app-components/UpgradePlan";
import { Collapse, IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import Menu from "./Menu";
import SideBarLoading from "./Menu/SideBarLoading";
import SidebarUserInfo from "./UserInfo";

const DesktopSidebar: FC = () => {
  const { t } = useTranslate();
  const { data: userInfo, isLoading } = useGetMe();
  const [isCollapsed, toggleCollapsed] = useToggleState(false);

  return (
    <Stack sx={{ position: "relative", display: { md: "flex", xs: "none" } }}>
      <IconButton
        onClick={toggleCollapsed}
        sx={{
          bgcolor: "dark.3",
          position: "absolute",
          right: "-12px",
          top: "40px",
          transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
          "&:hover": { bgcolor: "dark.3" },
          zIndex: 1000,
        }}
        size={"small"}
      >
        <Icon name="ArrowleftLineIcon" stroke="grey.light" />
      </IconButton>

      <Collapse in={!isCollapsed} collapsedSize={104} orientation="horizontal">
        <Stack
          sx={{
            width: isCollapsed ? 104 : 248,
            borderRight: "1.5px solid",
            borderColor: "dark.3",
            backgroundColor: "dark.2",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Stack
            sx={{
              p: 4,
              borderBottom: "1.5px solid",
              borderColor: "dark.3",
              position: "sticky",
              width: "100%",
              top: 0,
              bgcolor: "dark.2",
              zIndex: 100,
            }}
          >
            {isCollapsed ? <Logo /> : <LogoType />}
          </Stack>
          <Scrollbar sx={{ width: "100%" }}>
            <Stack py={4} px={isCollapsed ? 3 : 2} gap={4}>
              <Menu
                name={t("sidebar.services")}
                items={sidebarServicesItems}
                isCollapsed={isCollapsed}
              />
              {isLoading ? (
                <SideBarLoading />
              ) : (
                <>
                  {sidebarCommunityItems.filter((item) =>
                    userInfo?.data?.kyc_status
                      ? item
                      : !item?.items?.some((i) =>
                          i.path?.includes("affiliate"),
                        ),
                  ).length && (
                    <Menu
                      isCollapsed={isCollapsed}
                      name={t("sidebar.community")}
                      items={sidebarCommunityItems.filter((item) =>
                        userInfo?.data?.kyc_status
                          ? item
                          : !item?.items?.some((i) =>
                              i.path?.includes("affiliate"),
                            ),
                      )}
                    />
                  )}
                </>
              )}
            </Stack>
          </Scrollbar>
          <Stack
            mt={"auto"}
            gap={3}
            sx={{
              position: "sticky",
              bottom: 0,
              bgcolor: "dark.2",
              zIndex: 100,
            }}
          >
            {!isCollapsed && <UpgradePlan />}

            <SidebarUserInfo isCollapsed={isCollapsed} />
          </Stack>
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default DesktopSidebar;
