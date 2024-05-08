"use client";

import { Button, IconButton, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo, type FC } from "react";
import LogoType from "src/components/LogoType";
import { Icon } from "src/components/icons";
import { mapPathToName } from "src/configs/sidebar";
import { useIsMobile } from "src/hooks/use-responsive";

const DashboardHeader: FC = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const name = useMemo(() => (mapPathToName as any)?.[pathname.replaceAll("/", "")] || "Chainmind", [pathname]);

  return isMobile ? (
    <Stack bgcolor={"dark.1"}>
      <Stack px={3} pt={6} pb={2} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton>
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
