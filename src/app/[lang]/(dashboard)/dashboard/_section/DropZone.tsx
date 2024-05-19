"use client";

import CustomTable from "@/components/CustomTable";
import type { FC } from "react";

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
const DropZone: FC = () => <CustomTable title="Drop Zone" columns={columns} data={data} />;

export default DropZone;
