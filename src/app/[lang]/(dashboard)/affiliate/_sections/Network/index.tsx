"use client";

import { useMemo, useState, type FC } from "react";
import { Stack, Typography } from "@mui/material";
import Toggle from "@app/_components/Toggle";
import AffNetworkTabTable from "./Table";
import AffNetworkTabChart from "./Chart";
import { useTranslate } from "@/locales";

const AffNetworkTab: FC = () => {
  const { t } = useTranslate();

  const buttons = useMemo(
    () => [
      { label: t("affNetworkTab.table"), value: 1 },
      {
        label: (
          <Stack direction="row" gap={1} alignItems="center">
            {t("affNetworkTab.chart")}
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ borderRadius: 1.5, backgroundColor: "rgba(98, 101, 131, 0.12)" }}
              px={1}
              height={24}
            >
              <Typography variant="caption-semi-bold" color={"pink.light"}>
                {t("affNetworkTab.comingSoon")}
              </Typography>
            </Stack>
          </Stack>
        ),
        value: 2,
      },
    ],
    [t]
  );

  const [value, setValue] = useState<any>(buttons[0].value);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
      <Stack alignItems={"flex-start"}>
        <Toggle setValue={handleChange} buttons={buttons} value={value} />
      </Stack>

      {value === 1 ? <AffNetworkTabTable /> : <AffNetworkTabChart />}
    </Stack>
  );
};

export default AffNetworkTab;
