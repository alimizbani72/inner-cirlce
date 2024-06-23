"use client";

import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import ActivePlan from "./ActivePlan";
import PlanCard from "./PlanCard";
import Scrollbar from "@/components/Scrollbar";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import PricingTable from "./PricingTable";
import { selectPlans, selectRows } from "@/lib/features/plans/plansSlice";
import { useAccountServiceAuthUserinfoQuery } from "@minecraft/queries";
import { getUserPlanType } from "@/consts";
import { plans } from "@/configs/plans";

const PricingSection: FC = () => {
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();

  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const plansData = useAppSelector(selectPlans);
  const rows = useAppSelector(selectRows);
  return (
    <Stack
      sx={{
        ".os-scrollbar-handle": {
          cursor: "pointer",
          backgroundColor: "grey.dark",
          "&:hover": { backgroundColor: "grey.dark" },
        },
      }}
    >
      <ActivePlan />

      <Stack
        py={{ md: 4, xs: 3 }}
        maxWidth={{ md: `calc(100vw - ${isCollapsed ? 104 : 248}px)`, xs: "100vw" }}
        overflow={"hidden"}
        gap={4}
      >
        <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
          <Stack
            direction={"row"}
            gap={3}
            px={{ md: 4, xs: 3 }}
            pb={3}
            minWidth={{ md: "calc(1128px + 64px)", xs: "calc(1128px + 48px)" }}
          >
            {plansData.map((plan) => (
              <PlanCard
                key={plan.id}
                {...plan}
                disabled={
                  plans[getUserPlanType(userInfo) as keyof typeof plans].order >=
                  plans[plan.plan_type as keyof typeof plans].order
                }
              />
            ))}
          </Stack>
        </Scrollbar>

        <Stack gap={2}>
          <Typography px={{ md: 4, xs: 3 }} variant="h4-semi-bold">
            Compare Plans
          </Typography>
          <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
            <Stack minWidth={{ md: "calc(1128px + 64px)", xs: "calc(1128px + 48px)" }} pb={3} px={{ md: 4, xs: 3 }}>
              <PricingTable plansData={plansData} rows={rows} userType={getUserPlanType(userInfo)} />
            </Stack>
          </Scrollbar>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PricingSection;
