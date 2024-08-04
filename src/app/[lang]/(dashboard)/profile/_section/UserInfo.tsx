import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import LangSelector from "./LangSelector";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { getUserPlanType } from "@/consts";
import { toTitleCase } from "@/utils/change-case";
import { useTranslate } from "@/locales";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const UserInfo = () => {
  const userInfo = useAppSelector(selectUser);
  const isFreePlan = getUserPlanType(userInfo!) === "plankton";
  const { t } = useTranslate();

  const isMobile = useIsMobile();
  return (
    <Stack sx={{ bgcolor: "dark.3", borderRadius: "12px", width: "100%", mb: 2 }}>
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ p: 3 }}
        gap={2}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Avatar sx={{ width: 64, height: 64 }} src={userInfo?.avatar_url}>
            {userInfo?.full_name?.at(0)}
          </Avatar>
          <Stack>
            <Typography variant="p2-semi-bold" color="common.white">
              {userInfo?.full_name}
            </Typography>
            <Typography variant="caption-medium" color="grey.light">
              {userInfo?.email}
            </Typography>
          </Stack>
        </Stack>
        <LangSelector />
      </Stack>
      <Divider sx={{ borderColor: "dark.1" }} />
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems={"center"}
        sx={{ p: 3 }}
        justifyContent={"center"}
        gap={2}
      >
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Icon
            name={isFreePlan ? "Warning--colorful" : "Subscription--colorful"}
            color={isFreePlan ? undefined : "warning.main"}
            size={32}
          />
          <Typography variant="p2-semi-bold">
            {isFreePlan ? t("userInfo.noMembership") : toTitleCase(getUserPlanType(userInfo))}
            <Typography component={"span"} variant="p2-regular">
              {t("userInfo.membershipSuffix")}
            </Typography>
          </Typography>
        </Stack>

        {getUserPlanType(userInfo) !== "whale" && (
          <Button sx={{ ml: isMobile ? "none" : "auto" }} fullWidth={isMobile} href="/pricing">
            {t("userInfo.upgradeButton")}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
export default UserInfo;
