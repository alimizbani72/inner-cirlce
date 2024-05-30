import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import LangSelector from "./LangSelector";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAccountServiceAuthUserinfoQuery } from "@/services/queries";

const UserInfo = () => {
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

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
          <Avatar sx={{ width: 64, height: 64 }} src={(userInfo as any)?.data?.avatar_url}>
            {(userInfo as any)?.data?.full_name?.at(0)}
          </Avatar>
          <Stack>
            <Typography variant="p2-semi-bold" color="common.white">
              {(userInfo as any)?.data?.full_name}
            </Typography>
            <Typography variant="caption-medium" color="grey.light">
              {(userInfo as any)?.data?.email}
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
          <Icon name="Warning--colorful" size={32} />
          <Typography variant="p2-semi-bold">
            You have not{" "}
            <Typography component={"span"} variant="p2-regular">
              Subscription!
            </Typography>
          </Typography>
        </Stack>

        <Button sx={{ ml: isMobile ? "none" : "auto" }} fullWidth={isMobile}>
          Upgrade
        </Button>
      </Stack>
    </Stack>
  );
};
export default UserInfo;
