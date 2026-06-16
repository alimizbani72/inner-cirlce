"use client";

import { Stack } from "@mui/material";
import { type FC, useMemo, useState } from "react";
import AffNetworkTabTable from "./Table";

import Toggle from "@/components/Toggle";
import { useTranslate } from "@/locales";

const AffNetworkTab: FC = () => {
  const { t } = useTranslate();

  const buttons = useMemo(
    () => [
      { label: t("affNetworkTab.table"), value: 1 },
      // { label: t("affNetworkTab.chart"), value: 2 },
    ],
    [t],
  );

  const [value, setValue] = useState<any>(buttons[0].value);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
        <Stack alignItems={"flex-start"}>
          <Toggle setValue={handleChange} buttons={buttons} value={value} />
        </Stack>
      </Stack>
      <AffNetworkTabTable />
    </>
  );
};

export default AffNetworkTab;
