"use client";

import Icon from "@/components/icon";
import RiveComp from "@/components/rive-loader";
import { plans } from "@/configs/plans";
import { getUserPlanType } from "@/consts";
import useToggleState from "@/hooks/use-toggle-state";
import { useTranslate } from "@/locales";
import {
  useGetGlobalsVideoGlobal,
  useGetMe,
} from "@/services/minecraft/default/default";
import { toTitleCase } from "@/utils/change-case";
import { convertRoute } from "@/utils/string";
import LearningDialog from "@app-components/LearningDialog";
import { Box, Button, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import type { FC } from "react";

const WelcomeBanner: FC = () => {
  const [open, toggle] = useToggleState(false);
  const { data: userInfo, isLoading } = useGetMe();
  const { t } = useTranslate();
  const pathName = usePathname();
  // const lang = useAppSelector(selectLang);
  const { data } = useGetGlobalsVideoGlobal();

  const vid = data?.data?.videos?.filter(
    (item: any) => item.videoPage === convertRoute(pathName),
  );

  return (
    <>
      <Stack
        sx={{ position: "relative", overflow: "hidden" }}
        height={{ md: "200px", xs: "344px" }}
        className={isLoading ? "loading-skeleton" : ""}
      >
        {userInfo?.data && (
          <>
            <Box
              sx={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)",
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
              <img
                src="/assets/svg/texture.svg"
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />
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
                    <Typography variant="h3-semi-bold">
                      {t("welcomeBanner.hi", {
                        name: toTitleCase(userInfo?.data?.full_name!),
                      })}
                    </Typography>
                    <Typography variant="h3-regular">
                      {t("welcomeBanner.welcomeBack")}
                    </Typography>
                  </Box>

                  <Typography variant="p2-medium" color={"grey.light"}>
                    {vid?.[0]?.title as string}
                  </Typography>
                </Stack>

                {!!vid?.length && (
                  <Button
                    color="tertiary"
                    size="large"
                    startIcon={<Icon name="PlayIcon" />}
                    onClick={toggle}
                  >
                    {t("welcomeBanner.welcomeVideo")}
                  </Button>
                )}
              </Stack>

              <Stack
                p={1}
                pl={
                  getUserPlanType(userInfo?.data) !== "fisherman_plus" ? 2 : 3
                }
                pr={
                  getUserPlanType(userInfo?.data) !== "fisherman_plus"
                    ? undefined
                    : 4
                }
                gap={"28px"}
                bgcolor={"rgba(255, 255, 255, 0.08)"}
                sx={{ backdropFilter: "blur(20px)", borderRadius: "32px" }}
                direction={"row"}
              >
                <Stack direction={"row"} gap={1}>
                  <Box sx={{ aspectRatio: 1 }} width={48} height={48}>
                    {plans[
                      getUserPlanType(userInfo?.data) as keyof typeof plans
                    ]?.rive && (
                      <RiveComp
                        src={
                          plans[
                            getUserPlanType(
                              userInfo?.data,
                            ) as keyof typeof plans
                          ].rive
                        }
                        width={48}
                        height={48}
                      />
                    )}
                  </Box>

                  <Stack>
                    <Typography
                      textTransform={"uppercase"}
                      variant="p1-semi-bold"
                    >
                      {toTitleCase(getUserPlanType(userInfo?.data))}
                    </Typography>
                    <Typography variant="caption-medium" color={"grey.light"}>
                      {t("welcomeBanner.youAre")}
                    </Typography>
                  </Stack>
                </Stack>

                {getUserPlanType(userInfo?.data) !== "fisherman_plus" && (
                  <Button
                    href="/pricing"
                    color="secondary"
                    size="large"
                    startIcon={<Icon name="SubscriptionIcon" fill="dark.1" />}
                  >
                    {t("button.upgrade")}
                  </Button>
                )}
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
      {open && !!vid?.length && (
        <LearningDialog
          open={open}
          close={toggle}
          videoLink={vid?.[0]?.videoLink as string}
          title={vid?.[0]?.title as string}
        />
      )}
    </>
  );
};

export default WelcomeBanner;
