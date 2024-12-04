"use client";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import Toggle from "@app/_components/Toggle";
import { Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { type PropsWithChildren, useMemo } from "react";

const CoinReportToggle = ({ children }: PropsWithChildren) => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const { push } = useAppRouter();
  const { t } = useTranslate();
  const pathname = usePathname();

  const buttons = useMemo(
    () => [
      {
        label: <Typography variant="p2-medium">{t("coinReportTable.allCoins")}</Typography>,
        value: "all-coins",
      },
      {
        label: <Typography variant="p2-medium">{t("coinReportTable.favorites")}</Typography>,
        value: "favorites",
      },
    ],
    [t]
  );

  return (
    <Stack
      spacing={3}
      px={{ md: 4, sm: 3, xs: 1.5 }}
      width={{ md: `calc(100vw - ${isCollapsed ? 105 : 248}px)`, xs: "calc(100vw - 16px)" }}
    >
      <Toggle
        setValue={(val) => push(`/coin-reports-two${val === "favorites" ? "/favorite" : ""}`)}
        buttons={buttons}
        value={pathname?.includes("favorite") ? "favorites" : "all-coins"}
        width="max-content"
        sx={{ px: { xs: "20px !important", md: "24px !important" } }}
      />
      {children}
    </Stack>
  );
};

export default CoinReportToggle;
