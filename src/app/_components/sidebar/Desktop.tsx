import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import LogoType from "../../../components/LogoType";
import { Icon } from "../../../components/icons";
import Menu from "./Menu";
import { sidebarCommunityItems, sidebarServicesItems } from "src/configs/sidebar";
import SidebarUserInfo from "./UserInfo";

const DesktopSidebar: FC = () => {
  return (
    <Stack sx={{ borderRight: "1.5px solid", borderColor: "dark.3", height: "100%" }}>
      <Stack sx={{ p: 4, borderBottom: "1.5px solid", borderColor: "dark.3", position: "relative" }}>
        <LogoType />

        <IconButton
          sx={{
            bgcolor: "dark.3",
            position: "absolute",
            right: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
            "&:hover": { bgcolor: "dark.3" },
          }}
          size={"small"}
        >
          <Icon name="Arrow-Left" color="grey.light" />
        </IconButton>
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

export default DesktopSidebar;
