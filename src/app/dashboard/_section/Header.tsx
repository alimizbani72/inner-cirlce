"use client";

import { isMobileMenuOpened, mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo, type FC } from "react";
import MobileSidebar from "src/app/_components/sidebar/Mobile";
import LogoType from "src/components/LogoType";
import { Icon } from "src/components/icons";
import { mapPathToName } from "src/configs/sidebar";
import { useIsMobile } from "src/hooks/use-responsive";

const DashboardHeader: FC = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isMenuOpened = useAppSelector(isMobileMenuOpened);
  const name = useMemo(() => (mapPathToName as any)?.[pathname.replace("/dashboard/", "")] || "Chainmind", [pathname]);

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
          alignItems={"flex-start"}
          justifyContent={"center"}
          p={3}
          borderTop={"1.5px solid"}
          borderBottom={"1.5px solid"}
          borderColor={"dark.3"}
        >
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
    <Stack bgcolor={"dark.1"} p={4} justifyContent={"space-between"} alignItems={"center"} direction={"row"}>
      <Typography variant={"p1-medium"}>{name}</Typography>

      <Button color="info" startIcon={<Icon name="Bell" />}>
        Notification
      </Button>
    </Stack>
  );
};

export default DashboardHeader;
