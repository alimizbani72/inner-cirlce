"use client";

import { generateIntercomHash } from "@/app/_actions/intercom";
import Icon from "@/components/icon";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import { snipText } from "@/utils/string";
import IntercomMessenger from "@app-components/IntercomMessenger";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";
import LogoutDialog from "./LogoutDialog";

type Props = {
  isCollapsed?: boolean;
};

const SidebarUserInfo = ({ isCollapsed }: Props) => {
  const isMobile = useIsMobile();
  const { push } = useRouter();
  const { t } = useTranslate();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data, isFetching } = useGetMe();
  const userInfo = data?.data;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [intercomHash, setIntercomHash] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo?.id) {
      generateIntercomHash(userInfo.id)
        .then(setIntercomHash)
        .catch((error) =>
          console.error("Error generating Intercom hash:", error),
        );
    }
  }, [userInfo?.id]);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {userInfo && userInfo.id && intercomHash && (
        <IntercomMessenger user={userInfo} userHash={intercomHash} />
      )}

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
            : {
                mt: 4,
                mx: 3,
                p: 2,
                borderRadius: 1.5,
                border: "1.5px solid",
                bgcolor: "dark.2",
              }),
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

        <Stack
          className={isFetching ? "loading-skeleton" : ""}
          direction={"row"}
          alignItems={"center"}
          gap={1}
          sx={{ width: "100%", cursor: "pointer" }}
          onClick={handleMenuOpen}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "pink.dark",
              fontWeight: 600,
              cursor: "pointer",
              color: "common.white",
            }}
            variant="circular"
            src={userInfo?.avatar_url}
          >
            {userInfo?.full_name?.at(0)}
          </Avatar>
          {!isCollapsed && (
            <>
              <Typography variant="p2-medium" sx={{ ...snipText(1) }}>
                {userInfo?.full_name}
              </Typography>
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{ ml: "auto" }}
              >
                <Icon name="MoreIcon" />
              </IconButton>
            </>
          )}
        </Stack>
      </Stack>
      {/* TODO : use customPopover */}
      {!!anchorEl && (
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
          <MenuItem onClick={() => push("/terms-and-condition")}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              width={"100%"}
              spacing={1}
            >
              <Icon name="WarningIcon" />

              <Typography variant="p2-medium">
                {t("profileDialog.privacy")}
              </Typography>
            </Stack>
          </MenuItem>
          <Divider
            flexItem
            sx={{
              borderColor: "dark.3",
              width: "100%",
              borderWidth: "1.5px",
            }}
          />
          <MenuItem onClick={() => setOpenDialog(true)}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              width={"100%"}
              spacing={1}
            >
              <Icon name="LogoutIcon" stroke="danger.main" />

              <Typography variant="p2-medium">
                {t("profileDialog.logout")}
              </Typography>
            </Stack>
          </MenuItem>
        </Menu>
      )}
      {openDialog && (
        <LogoutDialog open={openDialog} close={() => setOpenDialog(false)} />
      )}
    </>
  );
};

export default SidebarUserInfo;
