"use client";

import { useState, type FC } from "react";
import { Stack, Typography } from "@mui/material";
import Toggle from "@app/_components/Toggle";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";

interface TableProps {}

const buttons = [
  {
    label: "Standard Coin Reports",
    value: 1,
  },
  {
    label: (
      <Stack direction={"row"} gap={0.5} alignItems={"center"}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ borderRadius: 1.5, background: (theme) => theme.palette.gradient.pink }}
          px={1}
          height={24}
        >
          <Typography variant="caption-semi-bold">10X</Typography>
        </Stack>
        Coin Reports
      </Stack>
    ),
    value: 2,
  },
  {
    label: (
      <Stack direction={"row"} gap={0.5} alignItems={"center"}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ borderRadius: 1.5, background: (theme) => theme.palette.gradient.blue }}
          px={1}
          height={24}
        >
          <Typography variant="caption-semi-bold">100X</Typography>
        </Stack>
        Coin Reports
      </Stack>
    ),
    value: 3,
  },
];

const columns = [
  {
    title: "Name",
    modify: (row: any) => row.title,
  },
  {
    title: "Evaluation",
    modify: (row: any) => row.evaluation,
  },
  {
    title: "Category",
    modify: (row: any) => row.category,
  },
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
    <Stack>
      <Scrollbar>
        <Stack pl={{ md: 4, xs: 3 }} pb={3} alignItems="flex-start" maxWidth="100vw">
          <Stack pr={{ md: 4, xs: 3 }}>
            <Toggle setValue={handleChange} buttons={buttons} value={value} />
          </Stack>
        </Stack>
      </Scrollbar>

      <Scrollbar>
        <Stack
          pl={{ md: 4, xs: 3 }}
          pb={3}
          alignItems="flex-start"
          maxWidth="100vw"
          sx={{ "> div": { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          <CustomTable title={buttons.find((i) => i.value === value)?.label} columns={columns} data={data} />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default Table;
