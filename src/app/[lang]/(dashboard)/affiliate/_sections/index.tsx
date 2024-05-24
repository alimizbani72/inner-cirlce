"use client";

import Scrollbar from "@/components/Scrollbar";
import Toggle from "@app/_components/Toggle";
import { Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import TabContent from "./TabContent";
import AffiliateHeader from "./Header";

const buttons = [
  { label: "Dashboard", value: 1 },
  {
    label: (
      <Stack direction="row" gap={1} alignItems="center">
        Statistics
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ borderRadius: 1.5, backgroundColor: "dark.1" }}
          px={1}
          height={24}
        >
          <Typography
            variant="caption-semi-bold"
            sx={{
              background: (theme) => theme.palette.gradient.pink,
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Coming soon
          </Typography>
        </Stack>
      </Stack>
    ),
    value: 2,
  },
  { label: "Network", value: 3 },
  { label: "Commissions", value: 4 },
  { label: "Payouts", value: 5 },
];

const AffiliateSection: FC = () => {
  const [value, setValue] = useState<any>(buttons[0].value);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Stack flex={1}>
      {/* Header */}
      <AffiliateHeader />

      {/* Tabs */}
      <Scrollbar>
        <Stack pl={{ md: 4, xs: 3 }} alignItems="flex-start" maxWidth="100vw">
          <Stack pr={{ md: 4, xs: 3 }}>
            <Toggle setValue={handleChange} buttons={buttons} value={value} />
          </Stack>
        </Stack>
      </Scrollbar>

      {/* Tab Content */}
      <Stack flex={1}>
        <TabContent value={value} />
      </Stack>
    </Stack>
  );
};

export default AffiliateSection;
