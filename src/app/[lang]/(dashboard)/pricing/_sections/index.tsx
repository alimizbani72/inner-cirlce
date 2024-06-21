"use client";

import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import ActivePlan from "./ActivePlan";
import PlanCard from "./PlanCard";
import Scrollbar from "@/components/Scrollbar";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import PricingTable from "./PricingTable";

const plans = [
  {
    id: 111234121,
    title: "Shrimp",
    plan_type: "shrimp",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "497",
  },
  {
    id: 11214311,
    title: "Fish",
    plan_type: "fish",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "1997",
  },
  {
    id: 112456511,
    title: "Shark",
    plan_type: "shark",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "4997",
  },
  {
    id: 1315411,
    title: "Whale",
    plan_type: "whale",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "9997",
  },
];

const plansName = ["Shrimp", "Fish", "Shark", "Whale"];
const rows = {
  "Coinreports (10x)": ["3", "10", "15", "20+"],
  "Coinreports (100x)": [false, false, false, "10+"],
  "Secret Gems": [false, false, false, "Unlimited"],
  "In depth Analysis": [true, true, true, true],
  Price: ["€497", "€1,997", "€4,997", "€9,997"],
};

const PricingSection: FC = () => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);

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
            {plans.map((plan) => (
              <PlanCard key={plan.id} {...plan} />
            ))}
          </Stack>
        </Scrollbar>

        <Stack gap={2}>
          <Typography px={{ md: 4, xs: 3 }} variant="h4-semi-bold">
            Compare Plans
          </Typography>
          <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
            <Stack minWidth={{ md: "calc(1128px + 64px)", xs: "calc(1128px + 48px)" }} pb={3} px={{ md: 4, xs: 3 }}>
              <PricingTable plans={plansName} rows={rows} />
            </Stack>
          </Scrollbar>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PricingSection;
