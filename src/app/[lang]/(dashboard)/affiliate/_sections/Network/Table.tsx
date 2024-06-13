"use client";

import type { FC } from "react";
import { Stack } from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import CustomTable from "@/components/CustomTable";

const columns = [
  {
    title: "Username",
    modify: (row: any) => row.username,
  },
  {
    title: "Package",
    modify: (row: any) => row.package,
  },
  {
    title: "Joined Date",
    modify: (row: any) => row.joinedDate,
  },
  {
    title: "Money made?",
    modify: (row: any) => row.moneyMade,
  },
];

const data = [
  {
    id: 1,
    username: "User1",
    package: "Fish",
    joinedDate: "10.02.2024",
    moneyMade: "$4,200.00",
    children: [
      {
        id: 1.1,
        username: "User1-1",
        package: "SubFish",
        joinedDate: "11.02.2024",
        moneyMade: "$1,200.00",
      },
      {
        id: 1.2,
        username: "User1-2",
        package: "SubFish",
        joinedDate: "12.02.2024",
        moneyMade: "$1,500.00",
      },
    ],
  },
  {
    id: 2,
    username: "User2",
    package: "Shark",
    joinedDate: "10.02.2024",
    moneyMade: "$4,200.00",
    children: [
      {
        id: 2.1,
        username: "User2-1",
        package: "SubShark",
        joinedDate: "13.02.2024",
        moneyMade: "$2,000.00",
      },
    ],
  },
  {
    id: 3,
    username: "User3",
    package: "Whale",
    joinedDate: "10.02.2024",
    moneyMade: "$4,200.00",
    children: [], // No children for this row
  },
  {
    id: 4,
    username: "User4",
    package: "Fish",
    joinedDate: "10.02.2024",
    moneyMade: "$4,200.00",
    children: [
      {
        id: 4.1,
        username: "User4-1",
        package: "SubFish",
        joinedDate: "14.02.2024",
        moneyMade: "$900.00",
      },
      {
        id: 4.2,
        username: "User4-2",
        package: "SubFish",
        joinedDate: "15.02.2024",
        moneyMade: "$800.00",
      },
      {
        id: 4.3,
        username: "User4-3",
        package: "SubFish",
        joinedDate: "16.02.2024",
        moneyMade: "$700.00",
        children: [
          {
            id: 5.1,
            username: "User4-3-1",
            package: "SubFish",
            joinedDate: "14.02.2024",
            moneyMade: "$900.00",
          },
          {
            id: 5.2,
            username: "User4-3-2",
            package: "SubFish",
            joinedDate: "15.02.2024",
            moneyMade: "$800.00",
          },
          {
            id: 5.3,
            username: "User4-3-3",
            package: "SubFish",
            joinedDate: "16.02.2024",
            moneyMade: "$700.00",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    username: "User5",
    package: "Shark",
    joinedDate: "10.02.2024",
    moneyMade: "$4,200.00",
    children: [], // No children for this row
  },
];

const AffNetworkTabTable: FC = () => {
  return (
    <Stack>
      <Scrollbar>
        <Stack
          alignItems="flex-start"
          maxWidth="100vw"
          sx={{ "> div": { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          <CustomTable columns={columns} data={data} />
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default AffNetworkTabTable;
