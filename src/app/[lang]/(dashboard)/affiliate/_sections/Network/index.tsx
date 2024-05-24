"use client";

import { useState, type FC } from "react";
import { Stack, Typography } from "@mui/material";
import Toggle from "@app/_components/Toggle";
import AffNetworkTabTable from "./Table";
import AffNetworkTabChart from "./Chart";

const buttons = [
  { label: "Table", value: 1 },
  {
    label: (
      <Stack direction="row" gap={1} alignItems="center">
        Chart
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ borderRadius: 1.5, backgroundColor: "rgba(98, 101, 131, 0.12)" }}
          px={1}
          height={24}
        >
          <Typography variant="caption-semi-bold" color={"pink.light"}>
            Coming soon
          </Typography>
        </Stack>
      </Stack>
    ),
    value: 2,
  },
];

const AffNetworkTab: FC = () => {
  const [value, setValue] = useState<any>(buttons[0].value);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Stack px={{ md: 4, xs: 3 }} pt={{ md: 3 }} flex={1} gap={3}>
      <Stack alignItems={"flex-start"}>
        <Toggle setValue={handleChange} buttons={buttons} value={value} />
      </Stack>

      {value === 1 ? <AffNetworkTabTable /> : <AffNetworkTabChart />}
    </Stack>
  );
};

export default AffNetworkTab;
