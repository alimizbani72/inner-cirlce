"use client";

import RiveComp from "@/components/RiveComp";
import { Icon } from "@/components/icons";
import { plans } from "@/configs/plans";
import { getUserPlanType } from "@/consts";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { useAccountServiceAuthUserinfoQuery } from "@minecraft/queries";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import type { FC } from "react";

interface UpgradePlanProps {}

const UpgradePlan: FC<UpgradePlanProps> = () => {
  const { t } = useTranslate();
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();
  const isFreePlan = getUserPlanType(userInfo) === "plankton";

  const { push } = useAppRouter();
  const pathname = usePathname();

  const handleUpgradeClick = () => {
    if (!pathname.includes("/pricing")) {
      push("/pricing");
    }
  };

  return (
    <Stack px={3}>
      <Stack borderRadius={2} bgcolor={!isFreePlan ? "dark.3" : "pink.dark"} position={"relative"} overflow={"hidden"}>
        <Box sx={{ position: "absolute", zIndex: 1, inset: 0, opacity: !isFreePlan ? 0.08 : 1 }}>
          <img src="/assets/svg/upgrade-card.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
        </Box>

        {!isFreePlan ? (
          <Stack p={2} position={"relative"} direction={"row"} zIndex={2} gap={1.5} alignItems={"center"}>
            <Box sx={{ aspectRatio: 1 }} width={40} height={40}>
              <RiveComp src={plans[getUserPlanType(userInfo) as keyof typeof plans].rive} width={40} height={40} />
            </Box>

            <Stack flex={1}>
              <Typography variant="p2-semi-bold" textTransform="capitalize">
                {getUserPlanType(userInfo)}
              </Typography>
              <Typography variant="caption-medium" color="grey.light">
                {t("plan.currentPlan")}
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack p={2} position={"relative"} zIndex={2} gap={1}>
            <Icon name="Subscription" />

            <Typography variant="p1-semi-bold">{t("plan.upgradePlan")}</Typography>
          </Stack>
        )}

        <Divider flexItem sx={{ borderWidth: "1.5px", borderColor: "dark.3" }} />

        {getUserPlanType(userInfo) !== "whale" && (
          <Stack
            p={2}
            justifyContent={"space-between"}
            position={"relative"}
            direction={"row"}
            zIndex={2}
            gap={3}
            sx={{ cursor: "pointer" }}
            onClick={handleUpgradeClick}
          >
            {!isFreePlan ? (
              <Typography variant="p2-medium" textTransform={"uppercase"}>
                {t("button.upgrade")}
              </Typography>
            ) : (
              <Typography variant="p2-semi-bold"> {t("button.buyNow")}</Typography>
            )}

            {!isFreePlan ? (
              <Box sx={{ aspectRatio: 1, position: "absolute", right: 10, bottom: 10 }}>
                <RiveComp src="/assets/rive/rocket.riv" width={35} height={35} />
              </Box>
            ) : (
              <Icon name="Arrow-right" />
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default UpgradePlan;
