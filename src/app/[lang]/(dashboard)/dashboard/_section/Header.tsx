"use client";

import { isMobileMenuOpened, mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo, type FC } from "react";
import LogoType from "@/components/LogoType";
import { Icon } from "@/components/icons";
import { mapPathToName } from "@/configs/sidebar";
import { useIsMobile } from "@/hooks/use-responsive";
import MobileSidebar from "@app/_components/sidebar/Mobile";
import { pageHasBackButton, pageTitle } from "@/lib/features/pageTitle/pageSlice";
import { useAppRouter } from "@/routes/hooks";
import windowAvailable from "@/utils/windowAvailable";

const DashboardHeader: FC = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isMenuOpened = useAppSelector(isMobileMenuOpened);
  const pageTitleSelector = useAppSelector(pageTitle);
  const hasBackButton = useAppSelector(pageHasBackButton);
  const { back } = useAppRouter();
  const name = useMemo(
    () => mapPathToName[pathname.slice(4) as keyof typeof mapPathToName] || pageTitleSelector || "Chainmind",
    [pathname, pageTitleSelector]
  );

  return isMobile ? (
    <>
      <Stack bgcolor={"dark.1"} position={"sticky"} top={0} zIndex={1000}>
        <Stack px={3} pt={6} pb={2} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton onClick={() => dispatch(mobileMenuToggle(true))}>
            <Icon name="Menu" />
          </IconButton>
          <LogoType />
          <IconButton>
            <Icon name="Bell" />
          </IconButton>
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
          {windowAvailable && hasBackButton && (
            <IconButton sx={{ mr: 1 }} onClick={() => back()}>
              <Icon name="Arrow-left" />
            </IconButton>
          )}

          <Typography variant={"h4-medium"}>{name}</Typography>
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
    >
      <Stack gap={1} direction={"row"}>
        {windowAvailable && hasBackButton && (
          <IconButton onClick={() => back()}>
            <Icon name="Arrow-left" />
          </IconButton>
        )}

        <Typography variant={"p1-medium"}>{name}</Typography>
      </Stack>

      <Button color="info" startIcon={<Icon name="Bell" />}>
        Notification
      </Button>
    </Stack>
  );
};

export default DashboardHeader;
