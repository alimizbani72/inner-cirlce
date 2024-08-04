import RiveComp from "@/components/RiveComp";
import { plans } from "@/configs/plans";
import { getUserPlanType } from "@/consts";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

const ActivePlan: FC = () => {
  const userInfo = useAppSelector(selectUser);
  const { t } = useTranslate();

  return (
    <Stack sx={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)",
          width: { md: 400, xs: 288 },
          height: { md: 400, xs: 288 },
          borderRadius: { md: "400px", xs: "288px" },
          position: "absolute",
          left: { md: "-200px", xs: "-144px" },
          top: { md: "-100px", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <img src="/assets/texture.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
          width: { md: 400, xs: 288 },
          height: { md: 400, xs: 288 },
          borderRadius: { md: "400px", xs: "288px" },
          position: "absolute",
          right: { md: "-200px", xs: "-144px" },
          top: { md: "-100px", xs: "unset" },
          bottom: { md: "unset", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Stack
        sx={{
          py: 3,
          px: { md: 4, xs: 3 },
          position: "relative",
          zIndex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { md: "row", xs: "column" },
          gap: { md: undefined, xs: 3 },
        }}
      >
        <Stack gap={1} direction={"row"} alignItems={"center"}>
          <Typography variant="p2-medium">{`${t("plan.currentPlan")}:`}</Typography>
          <Box sx={{ aspectRatio: 1 }} width={48} height={48}>
            <RiveComp src={plans[getUserPlanType(userInfo) as keyof typeof plans].rive} width={48} height={48} />
          </Box>
          <Typography variant="p1-semi-bold" textTransform="capitalize">
            {getUserPlanType(userInfo)}
          </Typography>
        </Stack>

        {/* <Button color="secondary" size="large" startIcon={<Icon color="dark.1" name="Subscription" />}>
          Upgrade
        </Button> */}
      </Stack>
    </Stack>
  );
};

export default ActivePlan;
