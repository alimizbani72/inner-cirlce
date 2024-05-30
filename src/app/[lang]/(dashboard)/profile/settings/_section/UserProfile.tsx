import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { useAccountServiceAuthUserinfoQuery } from "@/services/queries";

const UserProfile = () => {
  const isMobile = useIsMobile();
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

  return (
    <Stack sx={{ borderRadius: "12px", width: "100%", mb: 2 }}>
      <Stack direction={isMobile ? "column" : "row"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
        <Stack direction={"row"} spacing={2} alignItems={"center"} sx={{ width: "100%" }}>
          <Avatar sx={{ width: 96, height: 96 }} src={(userInfo as any)?.data?.avatar_url}>
            {(userInfo as any)?.data?.full_name?.at(0)}
          </Avatar>
          <Stack sx={{ width: "100%" }} gap={2}>
            <Typography variant="p2-semi-bold" color="common.white">
              User Profile
            </Typography>
            <Stack direction={isMobile ? "column" : "row"} gap={2} sx={{ width: "100%" }}>
              <Button startIcon={<Icon name="Plus" />} fullWidth sx={{ whiteSpace: "pre" }}>
                Upload Picture
              </Button>
              <Button color="info" startIcon={<Icon name="Close" />} fullWidth>
                Remove
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default UserProfile;
