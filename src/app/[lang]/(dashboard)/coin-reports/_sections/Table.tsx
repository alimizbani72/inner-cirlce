"use client";

import { useMemo, useState, type FC } from "react";
import { Stack, Typography } from "@mui/material";
import Toggle from "@app/_components/Toggle";
import Scrollbar from "@/components/Scrollbar";
import SortTable from "@/components/sortTable";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";
import { useContentServiceContentCoinReportLangQuery } from "@minecraft/queries";
import { useParams } from "next/navigation";
import { useTranslate } from "@/locales";

interface TableProps {}

const CoinReportTable: FC<TableProps> = () => {
  const { lang } = useParams();
  const { t } = useTranslate();
  const buttons = useMemo(
    () => [
      {
        label: t("coinReportTable.standardCoinReports"),
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
            {t("coinReportTable.coinReports")}
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
            {t("coinReportTable.coinReports")}
          </Stack>
        ),
        value: "coinreports-100x",
      },
    ],
    [t]
  );
  const [value, setValue] = useState<any>(buttons[0].value);
  const {
    data: coinsData,
    isSuccess,
    isPending,
  } = useContentServiceContentCoinReportLangQuery({ lang: lang as string });
  const isCollapsed = useAppSelector(isSidebarCollapsed);

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

export default CoinReportTable;
