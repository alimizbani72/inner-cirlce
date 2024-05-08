import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import LogoType from "../LogoType";
import { Icon } from "../icons";

const DesktopSidebar: FC = () => {
  return (
    <Stack sx={{ borderRight: "1.5px solid", borderColor: "dark.3", height: "100%" }}>
      <Stack sx={{ p: 4, borderBottom: "1.5px solid", borderColor: "dark.3", position: "relative" }}>
        <LogoType />

        <IconButton
          sx={{
            bgcolor: "dark.3",
            width: 24,
            height: 24,
            p: 0,
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
    </Stack>
  );
};

export default DesktopSidebar;
