"use client";
import RiveComp from "@/components/RiveComp";
import { Icon } from "@/components/icons";
import { plans } from "@/configs/plans";
import { getUserPlanType } from "@/consts";
import { toTitleCase } from "@/utils/change-case";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { useTranslate } from "@/locales";
import { useGlobalVideoGlobalServiceGetGlobalsVideoGlobal } from "@cms/queries";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { convertRoute } from "@/utils/string";
import LearningDialog from "@app/_components/LearningDialog";
import { selectUser } from "@/lib/features/user/userSlice";

const WelcomeBanner: FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const userInfo = useAppSelector(selectUser);
  const { t } = useTranslate();
  const pathName = usePathname();
  const lang = useAppSelector(selectLang);
  const { data } = useGlobalVideoGlobalServiceGetGlobalsVideoGlobal({ locale: lang });
  const vid = data?.videos?.filter((item: any) => item.videoPage === convertRoute(pathName));
  return (
    <>
      <Stack sx={{ position: "relative", overflow: "hidden" }}>
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
                <Typography variant="h3-semi-bold">
                  {t("welcomeBanner.hi", { name: toTitleCase(userInfo?.full_name!) })}
                </Typography>
                <Typography variant="h3-regular">{t("welcomeBanner.welcomeBack")}</Typography>
              </Box>

              <Typography variant="p2-medium" color={"grey.light"}>
                {vid?.[0]?.title}
              </Typography>
            </Stack>

            {!!vid?.length && (
              <Button color="info" size="large" startIcon={<Icon name="Play" />} onClick={() => setOpen(true)}>
                {t("welcomeBanner.welcomeVideo")}
              </Button>
            )}
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
                  {t("welcomeBanner.youAre")}
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
                {t("button.upgrade")}
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
      {!!open && !!vid?.length && (
        <LearningDialog open={open} close={handleClose} videoLink={vid?.[0]?.videoLink} title={vid?.[0]?.title} />
      )}
    </>
  );
};

export default WelcomeBanner;
