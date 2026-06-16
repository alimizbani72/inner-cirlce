import { useGetMe } from "@/services/minecraft/default/default";
import ContentStack from "@app-components/ContentStack";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const UserInfo = () => {
  const { data, isLoading } = useGetMe();
  const userInfo = data?.data;

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      {isLoading ? (
        <>
          <ContentStack
            className="loading-skeleton"
            sx={{ width: "56px", height: "56px", borderRadius: "50%" }}
          />
          <Stack spacing={2}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Box
                key={index}
                className="loading-skeleton"
                component="span"
                sx={{
                  borderRadius: 4,
                  width: "100px",
                  height: "12px",
                }}
              />
            ))}
          </Stack>
        </>
      ) : (
        <>
          <Avatar sx={{ width: 56, height: 56 }} src={userInfo?.avatar_url}>
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
        </>
      )}
    </Stack>
  );
};

export default UserInfo;
