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
    image: "/assets/shark.svg",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "497",
    onClick: () => ({}),
  },
  {
    id: 11214311,
    title: "Fish",
    image: "/assets/shark.svg",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "1997",
    onClick: () => ({}),
  },
  {
    id: 112456511,
    title: "Shark",
    image: "/assets/shark.svg",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "4997",
    onClick: () => ({}),
  },
  {
    id: 1315411,
    title: "Whale",
    image: "/assets/shark.svg",
    description: "Dip your fins in. Crypto basics so simple, even shrimp get it.",
    cost: "9997",
    onClick: () => ({}),
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
    <Stack>
      <ActivePlan />

      <Stack
        py={{ md: 4, xs: 3 }}
        maxWidth={{ md: `calc(100vw - ${isCollapsed ? 104 : 248}px)`, xs: "100vw" }}
        overflow={"hidden"}
        gap={4}
      >
        <Scrollbar>
          <Stack
            direction={"row"}
            gap={3}
            px={{ md: 4, xs: 3 }}
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
          <Scrollbar>
            <Stack minWidth={{ md: "calc(1128px + 64px)", xs: "calc(1128px + 48px)" }} px={{ md: 4, xs: 3 }}>
              <PricingTable plans={plansName} rows={rows} />
            </Stack>
          </Scrollbar>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PricingSection;
