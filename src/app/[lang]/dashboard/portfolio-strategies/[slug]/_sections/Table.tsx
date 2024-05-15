"use client";

import { useState, type FC } from "react";
import { InputLabel, Stack, TextField, Typography } from "@mui/material";
import Toggle from "@/app/[lang]/_components/Toggle";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";
import ContentStack from "@/app/[lang]/_components/ContentStack";

interface TableProps {}

const buttons = [
  { label: "Low Risk", value: 1 },
  { label: "Middle Rick", value: 2 },
  { label: "High Risk", value: 3 },
];

const columns = [
  { title: "Name", modify: (row: any) => row.title },
  { title: "Evaluation", modify: (row: any) => row.evaluation },
  { title: "Category", modify: (row: any) => row.category },
];

const data = [
  {
    id: 1,
    title: "Bitcoin",
    evaluation: "9,01",
    category: "Store of Value",
  },
  {
    id: 2,
    title: "Ethereum",
    evaluation: "8,65",
    category: "Layer 1",
  },
  {
    id: 3,
    title: "Solana",
    evaluation: "8,57",
    category: "Layer 1",
  },
];

const Table: FC<TableProps> = () => {
  const [value, setValue] = useState<any>(buttons[0].value);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Stack gap={3}>
      <Scrollbar>
        <Stack pl={{ md: 4, xs: 3 }} alignItems="flex-start" maxWidth="100vw">
          <Stack pr={{ md: 4, xs: 3 }}>
            <Toggle setValue={handleChange} buttons={buttons} value={value} />
          </Stack>
        </Stack>
      </Scrollbar>

      <Stack px={{ md: 4, xs: 3 }}>
        <ContentStack gap={3}>
          <Typography variant="p1-semi-bold">Strategy Plan</Typography>

          <Stack gap={3} direction={{ md: "row", xs: "column" }} alignItems={{ md: "flex-end", xs: undefined }}>
            <Stack flex={4 / 12}>
              <InputLabel
                sx={{ typography: "caption-semi-bold", textTransform: "uppercase" }}
                htmlFor="planned-investment"
              >
                Planned Investment
              </InputLabel>
              <TextField
                id="planned-investment"
                placeholder="Enter Amount"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Stack>

            <Typography flex={8 / 12} variant="p2-regular" color={"grey.light"}>
              By upgrading, subscribers can access additional benefits, enhanced functionalities, and premium content
              not available in their current plan.
            </Typography>
          </Stack>
        </ContentStack>
      </Stack>

      <Scrollbar>
        <Stack
          pl={{ md: 4, xs: 3 }}
          pr={{ md: 4, xs: 0 }}
          pb={3}
          alignItems="flex-start"
          maxWidth="100vw"
          sx={{
            "> div": {
              md: { borderTopRightRadius: 16, borderBottomRightRadius: 16, borderBottomLeftRadius: 16 },
              xs: { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
            },
          }}
        >
          <CustomTable title={buttons.find((i) => i.value === value)?.label} columns={columns} data={data} />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default Table;
