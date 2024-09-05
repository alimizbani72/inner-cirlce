"use client";

import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState, type FC, type MouseEvent } from "react";
import { Icon } from "@/components/icons";
import IntercomMessenger from "../IntercomMessenger";
import { selectUser } from "@/lib/features/user/userSlice";
import LogoutDialog from "./LogoutDialog";
import { useIsMobile } from "@/hooks/use-responsive";

const SidebarUserInfo: FC = () => {
  const isMobile = useIsMobile();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const userInfo = useAppSelector(selectUser);
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IntercomMessenger email={userInfo?.full_name!} />

      <Stack
        sx={{
          position: "relative",
          ...(!isMobile
            ? {
                p: 4,
                borderTop: "1.5px solid",
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
              }
            : { mt: 4, mx: 3, p: 2, borderRadius: 1.5, border: "1.5px solid", bgcolor: "dark.2" }),
          borderColor: "dark.3",
        }}
        direction={"row"}
        alignItems={"center"}
      >
        {!isMobile && (
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
        )}
        <Avatar
          sx={{ width: 40, height: 40, bgcolor: "pink.dark", fontWeight: 600, cursor: "pointer" }}
          variant="circular"
          src={userInfo?.avatar_url}
        >
          {userInfo?.full_name?.at(0)}
        </Avatar>

        {!isCollapsed && (
          <Box flex={1}>
            <Stack onClick={handleMenuOpen} direction="row" alignItems="center" sx={{ cursor: "pointer" }} flex={1}>
              <Typography ml={1.5} mr={"auto"} variant="p2-medium">
                {userInfo?.full_name}
              </Typography>

              <Icon name="More" />
            </Stack>
            <Menu
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={handleMenuClose}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              disableScrollLock
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "dark.2",
                  color: "white",
                  boxShadow: "0px 16px 32px 0px rgba(0, 0, 0, 0.16)",
                  border: "1px solid",
                  borderColor: "dark.3",
                  backgroundImage: "none",
                  p: 2,
                },
              }}
            >
              <MenuItem>
                <Stack direction={"row"} alignItems={"center"} width={"100%"} spacing={1}>
                  <Icon name="Warning-round" />

                  <Typography variant="p2-medium">Privacy Policy</Typography>
                </Stack>
              </MenuItem>
              <Divider flexItem sx={{ borderColor: "dark.3", width: "100%", borderWidth: "1.5px" }} />
              <MenuItem onClick={() => setOpenDialog(true)}>
                <Stack direction={"row"} alignItems={"center"} width={"100%"} spacing={1}>
                  <Icon name="LogOut" color="danger.main" />

                  <Typography variant="p2-medium">Logout</Typography>
                </Stack>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Stack>

      <LogoutDialog open={openDialog} close={() => setOpenDialog(false)} />
    </>
  );
};

export default SidebarUserInfo;
