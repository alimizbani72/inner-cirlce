"use client";

import { useEffect, useState, type FC } from "react";
import { InputLabel, Stack, TextField, Typography } from "@mui/material";
import Toggle from "@app/_components/Toggle";
import Scrollbar from "@/components/Scrollbar";
import ContentStack from "@app/_components/ContentStack";
import SortTable from "@/components/sortTable";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { useContentServiceContentPortfolioStrategyCreateMutation } from "@/services/queries";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";

interface TableProps {
  plan: string;
}

const buttons = [
  { label: "Low Risk", value: "Low Risk" },
  { label: "Middle Risk", value: "Mid Risk" },
  { label: "High Risk", value: "High Risk" },
];

const Table: FC<TableProps> = ({ plan }) => {
  const [value, setValue] = useState<any>(buttons[0].value);
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const {
    mutateAsync,
    data: content,
    isSuccess,
    isPending,
  } = useContentServiceContentPortfolioStrategyCreateMutation();
  const getPortfolioStrategy = async () => {
    try {
      await mutateAsync({ requestBody: { plan } });
    } catch (_error) {
      //
    }
  };

  useEffect(() => {
    getPortfolioStrategy();
  }, []);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Stack
      gap={3}
      sx={{
        ".os-scrollbar-handle": {
          cursor: "pointer",
          backgroundColor: "grey.dark",
          "&:hover": { backgroundColor: "grey.dark" },
        },
      }}
    >
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

      <Scrollbar options={{ scrollbars: { clickScroll: true, autoHide: "never" } }}>
        <Stack
          pl={{ md: 4, xs: 3 }}
          pr={{ md: 4, xs: 0 }}
          pb={3}
          alignItems="flex-start"
          maxWidth={`calc(100vw - ${isCollapsed ? "104px" : "248px"})`}
          sx={{
            "> div": {
              md: { borderTopRightRadius: 16, borderBottomRightRadius: 16, borderBottomLeftRadius: 16 },
              xs: { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 },
            },
          }}
        >
          {isSuccess ? (
            <SortTable
              title={`${buttons.find((i) => i.value === value)?.label} Strategy`}
              data={(content as any).data[value]}
            />
          ) : (
            <Stack width="100%" alignItems="center">
              {isPending ? <Loading /> : <Empty />}
            </Stack>
          )}
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default Table;
