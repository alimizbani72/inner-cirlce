"use client";

import type { FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import SortTable from "@/components/sortTable";

const data = [
  {
    id: 1,
    "title [p-sa]": "Bitcoin",
    "evaluation [p-sn]": 9001,
    "category [sd]": "2023-01-01",
    "prefix test [p-sn-pf=$]": 1000,
    "suffix test [p-sn-sf=%]": 50,
  },
  {
    id: 2,
    "title [p-sa]": "Ethereum",
    "evaluation [p-sn]": 865,
    "category [sd]": "2022-01-01",
    "prefix test [p-sn-pf=$]": 2000,
    "suffix test [p-sn-sf=%]": 75,
  },
  {
    id: 3,
    "title [p-sa]": "Solana",
    "evaluation [p-sn]": 892,
    "category [sd]": "2021-01-01",
    "prefix test [p-sn-pf=$]": 1500,
    "suffix test [p-sn-sf=%]": 90,
  },
  {
    id: 4,
    "title [p-sa]": "Cardano",
    "evaluation [p-sn]": 700,
    "category [sd]": "2023-05-15",
    "prefix test [p-sn-pf=$]": 3000,
    "suffix test [p-sn-sf=%]": 60,
  },
  {
    id: 5,
    "title [p-sa]": "Polkadot",
    "evaluation [p-sn]": 780,
    "category [sd]": "2020-06-10",
    "prefix test [p-sn-pf=$]": 1200,
    "suffix test [p-sn-sf=%]": 80,
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
          <SortTable title="Commissions" data={data} />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AffCommissionsTabTable;
