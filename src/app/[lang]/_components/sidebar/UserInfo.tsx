"use client";

import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { Icon } from "@/components/icons";
import useCustomRouter from "@/hooks/useCustomRouter";
import IntercomMessenger from "../IntercomMessenger";
import { selectUser } from "@/lib/features/user/userSlice";

const SidebarUserInfo: FC = () => {
  const userInfo = useAppSelector(selectUser);
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const { push } = useCustomRouter();

  return (
    <>
      <IntercomMessenger email={userInfo?.full_name!} />

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
          onClick={() => push("/profile/", { backURL: true })}
          sx={{ width: 40, height: 40, bgcolor: "pink.dark", fontWeight: 600, cursor: "pointer" }}
          variant="circular"
          src={userInfo?.avatar_url}
        >
          {userInfo?.full_name?.at(0)}
        </Avatar>

        {!isCollapsed && (
          <Stack
            onClick={() => push("/profile/", { backURL: true })}
            direction="row"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            flex={1}
          >
            <Typography ml={1.5} mr={"auto"} variant="p2-medium">
              {userInfo?.full_name}
            </Typography>

            <Icon name="More" />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default SidebarUserInfo;
