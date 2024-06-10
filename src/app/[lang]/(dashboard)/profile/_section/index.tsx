"use client";
import { Icon } from "@/components/icons";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UserInfo from "./UserInfo";
import useCustomRouter from "@/hooks/useCustomRouter";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    title: "Profile Settings",
    path: "/settings",
    icon: "Settings",
  },
  {
    title: "Help & Support",
    path: "/help-support",
    icon: "headphones-support",
  },
  {
    title: "Terms of Use | Privacy Policy",
    path: "/terms-privacy",
    icon: "Warning-round",
  },
  {
    title: "Be a Partner",
    path: "/become-partner",
    icon: "Hand",
  },
];

const ProfileDialog = () => {
  const { push, back } = useCustomRouter();

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            Profile
          </Typography>
          <IconButton onClick={back}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent="center" alignItems="center">
          <UserInfo />
          {menuItems.map((item, index) => (
            <Stack
              direction={"row"}
              key={index}
              sx={{ borderBottom: "1px solid", borderColor: "dark.3", width: "100%", py: 2, cursor: "pointer" }}
              gap={2}
              onClick={() => push(`/profile/${item.path}`)}
            >
              <Icon name={item.icon as any} />
              <Typography variant="p2-medium">{item.title}</Typography>
              <IconButton sx={{ ml: "auto" }}>
                <Icon name="Arrow-right" />
              </IconButton>
            </Stack>
          ))}
          <Stack
            direction={"row"}
            sx={{ width: "100%", py: 2, cursor: "pointer" }}
            gap={2}
            onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
          >
            <Icon name="LogOut" />
            <Typography variant="p2-medium">Logout</Typography>
          </Stack>
          <Typography sx={{ textAlign: "left", width: "100%", mt: 3 }} variant="p2-regular" color="grey.light">
            Copyright © 2023 ChainMind. All rights reserved.
          </Typography>
        </Stack>
      </DialogContent>
    </>
  );
};

export default ProfileDialog;
