"use client";

import { useEffect, useState, type FC } from "react";
import { Stack, Typography } from "@mui/material";
import Toggle from "@app/_components/Toggle";
import Scrollbar from "@/components/Scrollbar";
import SortTable from "@/components/sortTable";
import { useContentServiceContentCoinReportCreateMutation } from "@/services/queries";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";

interface TableProps {}

const buttons = [
  {
    label: "Standard Coin Reports",
    value: "coinreports-standard",
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
    value: "coinreports-10x",
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
    value: "coinreports-100x",
  },
];

const Table: FC<TableProps> = () => {
  const [value, setValue] = useState<any>(buttons[0].value);
  const { mutateAsync, data: coinsData, isSuccess, isPending } = useContentServiceContentCoinReportCreateMutation();
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const getCoins = async () => {
    try {
      await mutateAsync({ requestBody: { lang: "en" } });
    } catch (_error) {
      //
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  if (isPending) {
    return <Loading />;
  }

  if (!isSuccess) {
    return <Empty />;
  }

  return (
    <Stack
      sx={{
        ".os-scrollbar-handle": {
          cursor: "pointer",
          backgroundColor: "grey.dark",
          "&:hover": { backgroundColor: "grey.dark" },
        },
      }}
    >
      <Scrollbar>
        <Stack pl={{ md: 4, xs: 3 }} pb={3} alignItems="flex-start" maxWidth="100vw">
          <Stack pr={{ md: 4, xs: 3 }}>
            <Toggle setValue={handleChange} buttons={buttons} value={value} />
          </Stack>
        </Stack>
      </Scrollbar>

      <Scrollbar options={{ scrollbars: { clickScroll: true, autoHide: "never" } }}>
        <Stack
          pl={{ md: 4, xs: 3 }}
          pb={3}
          alignItems="flex-start"
          maxWidth={`calc(100vw - ${isCollapsed ? "104px" : "248px"})`}
          sx={{ "> div": { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 } }}
        >
          {isSuccess && <SortTable data={(coinsData as any).data[value]} />}
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default Table;
