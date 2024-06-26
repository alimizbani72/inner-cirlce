"use client";
import { Icon } from "@/components/icons";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UserInfo from "./UserInfo";
import useCustomRouter from "@/hooks/useCustomRouter";
import { signOut } from "next-auth/react";
import { profileMenuItems } from "@/configs/profile";
import { useAccountServiceAuthUserinfoQuery } from "@minecraft/queries";
import { getUserPlanType } from "@/consts";
import CustomDialog from "@/components/CustomDialog";
import { useModalActivation } from "@/hooks/useModalActivation";
import { useTranslate } from "@/locales";

const ProfileDialog = () => {
  const { push, back } = useCustomRouter();
  const { data: userInfoData } = useAccountServiceAuthUserinfoQuery();
  const isFreePlan = getUserPlanType(userInfoData) === "plankton";
  const open = useModalActivation("/profile/");
  const { t } = useTranslate();

  return (
    <CustomDialog fullWidth maxWidth="sm" aria-labelledby="profile-dialog" open={open} onClose={back}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="profile-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            {t("profileDialog.title")}
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
          {profileMenuItems
            .filter((item) =>
              isFreePlan || (userInfoData as any)?.data?.kyc_status ? !item.path.includes("become-partner") : item
            )
            .map((item, index) => (
              <Stack
                direction={"row"}
                key={index}
                sx={{ borderBottom: "1px solid", borderColor: "dark.3", width: "100%", py: 2, cursor: "pointer" }}
                gap={2}
                onClick={() => push(`/profile/${item.path}`)}
              >
                <Icon name={item.icon as any} />
                <Typography variant="p2-medium">{t(`profileDialog.${item.title}` as any)}</Typography>
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
            <Typography variant="p2-medium">{t("profileDialog.logout")}</Typography>
          </Stack>
          <Typography sx={{ textAlign: "left", width: "100%", mt: 3 }} variant="p2-regular" color="grey.light">
            {t("profileDialog.copyright", { year: new Date().getFullYear(), company: "ChainMind" })}
          </Typography>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ProfileDialog;
