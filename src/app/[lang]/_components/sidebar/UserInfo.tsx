"use client";

import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { Icon } from "@/components/icons";

const userInfo = {
  name: "Ellie Clark",
  avatar_url: "",
};

const SidebarUserInfo: FC = () => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);

  return (
    <Stack
      sx={{
        position: "relative",
        p: 4,
        borderTop: "1.5px solid",
        borderColor: "dark.3",
        "&:before": {
          content: '""',
          position: "absolute",
          left: 0,
          height: "1.5px",
          top: "-1px",
          display: "flex",
          width: 52,
          background: (theme) => theme.palette.gradient.pink,
        },
      }}
      direction={"row"}
      alignItems={"center"}
    >
      <Box
        sx={{
          position: "absolute",
          width: 8,
          height: 8,
          left: 46,
          top: "-4px",
          borderRadius: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "dark.1",
          "&:after": {
            content: '""',
            display: "flex",
            width: 4,
            height: 4,
            background: (theme) => theme.palette.gradient.pink,
            boxShadow: "0px 0px 8px 2px rgba(255, 125, 188, 0.24)",
            borderRadius: 0.5,
          },
        }}
      />
      <Avatar
        sx={{ width: 40, height: 40, bgcolor: "pink.dark", fontWeight: 600 }}
        variant="circular"
        src={userInfo?.avatar_url}
      >
        {userInfo?.name?.at(0)}
      </Avatar>

      {!isCollapsed && (
        <>
          <Typography ml={1.5} mr={"auto"} variant="p2-medium">
            {userInfo.name}
          </Typography>

          <IconButton>
            <Icon name="More" />
          </IconButton>
        </>
      )}
    </Stack>
  );
};

export default SidebarUserInfo;
