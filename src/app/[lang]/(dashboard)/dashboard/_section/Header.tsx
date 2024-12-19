"use client";

import Link from "@/components/Link";
import LogoType from "@/components/LogoType";
import RiveComp from "@/components/RiveComp";
import { Icon } from "@/components/icons";
import { mapPathToName } from "@/configs/sidebar";
import { useIsMobile } from "@/hooks/use-responsive";
import { isMobileMenuOpened, mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import { pageHasBackButton, pageTitle } from "@/lib/features/pageTitle/pageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { toNumber } from "@/utils/toNumber";
import MobileSidebar from "@app/_components/sidebar/Mobile";
import { useAffiliateServiceAffiliateMeQuery } from "@minecraft/queries";
import { Box, Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { type FC, useEffect, useMemo, useState } from "react";

const DashboardHeader: FC = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { data: me } = useAffiliateServiceAffiliateMeQuery();
  const [isClient, setIsClient] = useState(false);
  const pageTitleSelector = useAppSelector(pageTitle);
  const isMenuOpened = useAppSelector(isMobileMenuOpened);
  const hasBackButton = useAppSelector(pageHasBackButton);
  const { back } = useAppRouter();
  const name = useMemo(
    () =>
      mapPathToName[pathname.slice(4) as keyof typeof mapPathToName]
        ? t(`sidebar.${mapPathToName[pathname.slice(4) as keyof typeof mapPathToName]}` as any)
        : pageTitleSelector || "ChainMind",
    [pathname, pageTitleSelector]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isMobile ? (
    <>
      <Stack bgcolor={"dark.1"} position={"sticky"} top={0} zIndex={1000}>
        <Stack p={3} direction={"row"} alignItems={"center"} justifyContent="space-between" position="relative">
          <IconButton onClick={() => dispatch(mobileMenuToggle(true))}>
            <Icon name="Menu" />
          </IconButton>
          <LogoType />

          <Stack direction="row" spacing={2}>
            <Box position="relative">
              <Box position="absolute" left="-47px" top="-19px" sx={{ aspectRatio: 1 }}>
                <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
              </Box>
              <Typography color="common.white">{toNumber(me?.data?.goldCoins)}</Typography>
            </Box>
            <Link href="/telegram-channel">
              <img src="/assets/svg/telegramlogo.svg" />
            </Link>
          </Stack>

          {/* <IconButton>
            <Icon name="Bell" />
          </IconButton> */}
        </Stack>
        <Stack
          justifyContent={"flex-start"}
          alignItems={"center"}
          p={3}
          borderTop={"1.5px solid"}
          borderBottom={"1.5px solid"}
          borderColor={"dark.3"}
          direction={"row"}
        >
          {isClient && hasBackButton && (
            <IconButton sx={{ mr: 1 }} onClick={() => back()}>
              <Icon name="Arrow-left" />
            </IconButton>
          )}

          {isClient && <Typography variant={"h4-medium"}>{name}</Typography>}
        </Stack>
      </Stack>

      {/* Mobile menu drawer */}
      <Drawer
        open={isMenuOpened}
        variant="persistent"
        PaperProps={{ sx: { "&.MuiDrawer-paper": { bgcolor: "dark.1" } } }}
      >
        <MobileSidebar />
      </Drawer>
    </>
  ) : (
    <Stack
      bgcolor={"dark.2"}
      p={4}
      borderBottom={"1.5px solid"}
      borderColor={"dark.3"}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"row"}
      height={105}
    >
      <Stack gap={1} direction={"row"}>
        {isClient && hasBackButton && (
          <IconButton onClick={() => back()}>
            <Icon name="Arrow-left" />
          </IconButton>
        )}

        {isClient && <Typography variant={"p1-medium"}>{name}</Typography>}
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} position={"relative"}>
        <Button
          color="info"
          sx={{ py: 1, pr: 2, pl: 4.5 }}
          startIcon={
            <Box position="absolute" left="-6px" top="-13px" sx={{ aspectRatio: 1 }}>
              <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
            </Box>
          }
        >
          <Typography color="grey.light" variant="p2-medium" mr={0.5}>
            {t("afDashboardTab.goldCoins")}:
          </Typography>
          {toNumber(me?.data?.goldCoins)}
        </Button>

        <Link href="/telegram-channel">
          <Button color="info" sx={{ p: 1, pr: 3 }} startIcon={<img src="/assets/svg/telegramlogo.svg" />}>
            {t("sidebar.telegram-channel")}
          </Button>
        </Link>
      </Stack>
      {/* <Button color="info" startIcon={<Icon name="Bell" />}>
        Notification
      </Button> */}
    </Stack>
  );
};

export default DashboardHeader;
