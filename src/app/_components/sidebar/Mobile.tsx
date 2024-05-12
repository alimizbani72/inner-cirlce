import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import LogoType from "src/components/LogoType";
import Menu from "./Menu";
import SidebarUserInfo from "./UserInfo";
import { sidebarCommunityItems, sidebarServicesItems } from "src/configs/sidebar";
import { Icon } from "src/components/icons";

const MobileSidebar: FC = () => {
  return (
    <Stack sx={{ height: "100vh", width: "100vw" }}>
      <Stack
        bgcolor={"dark.1"}
        px={3}
        pt={6}
        pb={2}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"relative"}
      >
        <IconButton sx={{ position: "absolute", left: 24 }}>
          <Icon name="Close" />
        </IconButton>

        <LogoType />
      </Stack>

      <Stack py={4} px={2} gap={4}>
        <Menu name="Services" items={sidebarServicesItems} />
        <Menu name="Community" items={sidebarCommunityItems} />
      </Stack>

      <Stack mt={"auto"}>
        <SidebarUserInfo />
      </Stack>
    </Stack>
  );
};

export default MobileSidebar;
