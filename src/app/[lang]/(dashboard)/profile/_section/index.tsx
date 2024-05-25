"use client";
import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { useAppRouter } from "@/routes/hooks";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UserInfo from "./UserInfo";

const menuItems = [
  {
    title: "Profile Settings",
    path: "/profile-settings",
    icon: "Settings", // Replace with the actual icon class or path
  },
  {
    title: "Help & Support",
    path: "/help-support",
    icon: "headphones-support", // Replace with the actual icon class or path
  },
  {
    title: "Terms of Use | Privacy Policy",
    path: "/terms-privacy",
    icon: "Warning-round", // Replace with the actual icon class or path
  },
  {
    title: "Be a Partner",
    path: "/be-a-partner",
    icon: "Hand", // Replace with the actual icon class or path
  },
];

const ProfileDialog = () => {
  const { back } = useAppRouter();
  const handleClose = () => {
    back();
  };
  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={handleClose} aria-labelledby="profile-dialog" open>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            Profile
          </Typography>
          <IconButton onClick={handleClose}>
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
            >
              <Icon name={item.icon as any} />
              <Typography variant="p2-medium">{item.title}</Typography>
              <IconButton sx={{ ml: "auto" }}>
                <Icon name="Arrow-right" />
              </IconButton>
            </Stack>
          ))}
          <Stack direction={"row"} sx={{ width: "100%", py: 2, cursor: "pointer" }} gap={2}>
            <Icon name="LogOut" />
            <Typography variant="p2-medium">Logout</Typography>
          </Stack>
          <Typography sx={{ textAlign: "left", width: "100%", mt: 3 }} variant="p2-regular" color="grey.light">
            Copyright © 2023 ChainMind. All rights reserved.
          </Typography>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ProfileDialog;
