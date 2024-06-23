"use client";
import RiveComp from "@/components/RiveComp";
import { Icon } from "@/components/icons";
import { plans } from "@/configs/plans";
import { getUserPlanType } from "@/consts";
import { useAccountServiceAuthUserinfoQuery } from "@minecraft/queries";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";

const WelcomeBanner: FC = () => {
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

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
          py: { md: 4, xs: 6 },
          px: { md: 4, xs: 3 },
          position: "relative",
          zIndex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { md: "row", xs: "column" },
          gap: { md: undefined, xs: 6 },
        }}
      >
        <Stack gap={2} alignItems={"flex-start"}>
          <Stack gap={1}>
            <Box>
              <Typography variant="h3-semi-bold">Hi {(userInfo as any)?.data?.full_name}</Typography>
              <Typography variant="h3-regular">👋, Welcome back!</Typography>
            </Box>

            <Typography variant="p2-medium" color={"grey.light"}>
              With ChainMind, you can rest assured that your private data.
            </Typography>
          </Stack>

          <Button color="info" size="large" startIcon={<Icon name="Play" />}>
            Welcome Video
          </Button>
        </Stack>

        <Stack
          p={1}
          pl={getUserPlanType(userInfo) !== "whale" ? 2 : 3}
          pr={getUserPlanType(userInfo) !== "whale" ? undefined : 4}
          gap={"28px"}
          bgcolor={"rgba(255, 255, 255, 0.08)"}
          sx={{ backdropFilter: "blur(20px)", borderRadius: "32px" }}
          direction={"row"}
        >
          <Stack direction={"row"} gap={1}>
            <Box sx={{ aspectRatio: 1 }} width={48} height={48}>
              <RiveComp src={plans[getUserPlanType(userInfo) as keyof typeof plans].rive} width={48} height={48} />
            </Box>

            <Stack>
              <Typography textTransform={"uppercase"} variant="p1-semi-bold">
                {getUserPlanType(userInfo)}
              </Typography>
              <Typography variant="caption-medium" color={"grey.light"}>
                You're a
              </Typography>
            </Stack>
          </Stack>

          {getUserPlanType(userInfo) !== "whale" && (
            <Button
              href="/pricing"
              color="secondary"
              size="large"
              startIcon={<Icon color="dark.1" name="Subscription" />}
            >
              Upgrade
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WelcomeBanner;
