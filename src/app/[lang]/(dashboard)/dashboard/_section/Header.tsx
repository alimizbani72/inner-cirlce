"use client";

import { isMobileMenuOpened, mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Drawer, IconButton, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type FC } from "react";
import LogoType from "@/components/LogoType";
import { Icon } from "@/components/icons";
import { mapPathToName } from "@/configs/sidebar";
import { useIsMobile } from "@/hooks/use-responsive";
import MobileSidebar from "@app/_components/sidebar/Mobile";
import { pageHasBackButton, pageTitle } from "@/lib/features/pageTitle/pageSlice";
import { useAppRouter } from "@/routes/hooks";
import { useTranslate } from "@/locales";

const DashboardHeader: FC = () => {
  const { t } = useTranslate();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
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
        <Stack p={3} direction={"row"} alignItems={"center"} justifyContent="center" position="relative">
          <IconButton onClick={() => dispatch(mobileMenuToggle(true))} sx={{ position: "absolute", left: 24 }}>
            <Icon name="Menu" />
          </IconButton>
          <LogoType />
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

      {/* <Button color="info" startIcon={<Icon name="Bell" />}>
        Notification
      </Button> */}
    </Stack>
  );
};

export default DashboardHeader;
