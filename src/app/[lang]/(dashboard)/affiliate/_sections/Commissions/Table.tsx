"use client";

import type { FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";

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

const AffCommissionsTabTable: FC = () => {
  return (
    <Stack>
      <Scrollbar>
        <Stack
          alignItems="flex-start"
          maxWidth="100vw"
          sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          <CustomTable title="Commissions" columns={columns} data={data} />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AffCommissionsTabTable;
