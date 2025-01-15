"use client";

import CustomTable, { type SortType } from "@/components/CustomTable";
import Scrollbar from "@/components/Scrollbar";
import { useIsMobile } from "@/hooks/use-responsive";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import ContentStack from "@app/_components/ContentStack";
import Toggle from "@app/_components/Toggle";
import { useColumns } from "@dashboard/portfolio-strategies/[slug]/_sections/useColumns";
import { usePortfolioStrategyServicePortfolioStrategyPlanQuery } from "@minecraft/queries";
import type { PortfolioCoin } from "@minecraft/requests";
import { InputLabel, MenuItem, Select, Stack, TextField, Typography, selectClasses } from "@mui/material";
import { isFinite as checkInifinte, isNaN as checkNumber } from "lodash";
import orderBy from "lodash/orderBy";
import { type FC, useMemo, useState } from "react";

interface TableProps {
  plan: string;
}

const PortfolioTable: FC<TableProps> = ({ plan }) => {
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const { data: content } = usePortfolioStrategyServicePortfolioStrategyPlanQuery({ plan }, undefined, {
    select(data) {
      if (!data?.data) {
        return data; // Early return if no data
      }

      // Use `map` for transforming the data
      const modifiedData = data.data.map((item, index) => ({
        ...item,
        coins: item.coins?.map((coin, innerIndex) => ({
          ...coin,
          id: `${index}-${innerIndex}`, // Create a unique id using item id and index
        })),
      }));

      return { ...data, data: modifiedData };
    },
  });

  const [value, setValue] = useState<string | undefined>(content?.data?.at(0)?.strategy);
  const [sort, setSort] = useState<SortType>();
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const { columns } = useColumns();

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  const coins = useMemo(() => {
    const data = content?.data?.find((item) => item.strategy === value)?.coins;
    if (sort && data?.length) {
      const rows = [...data!];
      const key = Object.keys(sort!)?.[0] as keyof PortfolioCoin;

      const sorted = orderBy(
        rows,
        [
          (item) => {
            const value = item[key];
            // Check if the value is a number or can be parsed as a number
            if (!checkNumber(parseFloat(value as string)) && checkInifinte(parseFloat(value as string))) {
              return parseFloat(value as string);
            }
            // Otherwise, handle as a string for proper sorting
            return value?.toString()?.toLowerCase();
          },
        ],
        [sort[key] ? "asc" : "desc"]
      );
      return sorted;
    }

    return data;
  }, [value, sort]);

  const options = useMemo(
    () =>
      content?.data?.map((item) => ({
        label: item.strategy,
        value: item.strategy,
      })) || [],
    [content?.data]
  );

  return (
    <Stack gap={3}>
      {options?.length &&
        (isMobile ? (
          <Select
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            sx={{ mx: 3, [`& .${selectClasses.iconOutlined}`]: { color: "common.white" } }}
          >
            {options?.map((option) => (
              <MenuItem value={option?.value}>{option.label}</MenuItem>
            ))}
          </Select>
        ) : (
          <Scrollbar>
            <Stack pl={{ md: 4, xs: 3 }} alignItems="flex-start" maxWidth="100vw">
              <Stack pr={{ md: 4, xs: 3 }}>
                {content?.data?.length && <Toggle setValue={handleChange} buttons={options} value={value} />}
              </Stack>
            </Stack>
          </Scrollbar>
        ))}

      {false && (
        <Stack px={{ md: 4, xs: 3 }}>
          <ContentStack gap={3}>
            <Typography variant="p1-semi-bold">{t("portfolioTable.strategyPlan")}</Typography>

            <Stack gap={3} direction={{ md: "row", xs: "column" }} alignItems={{ md: "flex-end", xs: undefined }}>
              <Stack flex={4 / 12}>
                <InputLabel
                  sx={{ typography: "caption-semi-bold", color: "white", textTransform: "uppercase" }}
                  htmlFor="planned-investment"
                >
                  {t("portfolioTable.plannedInvestment")}
                </InputLabel>
                <TextField
                  id="planned-investment"
                  placeholder={t("portfolioTable.enterAmount")}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Stack>

              <Typography flex={8 / 12} variant="p2-regular" color={"grey.light"}>
                {t("portfolioTable.upgradeMessage")}
              </Typography>
            </Stack>
          </ContentStack>
        </Stack>
      )}

      <Stack
        pl={{ md: 4, xs: 0 }}
        pr={{ md: 4, xs: 0 }}
        pb={3}
        width={{ md: `calc(100vw - ${isCollapsed ? 105 : 248}px)`, xs: "100vw" }}
        sx={{
          "table tbody tr td": {
            textWrap: "nowrap",
          },
        }}
      >
        <CustomTable
          title={`${value ?? ""} ${t("portfolioTable.strategy")}`}
          columns={columns}
          data={coins || []}
          onSortChange={(val) => setSort(val)}
          sort={sort}
          isStickyFirstColumn
        />
      </Stack>
    </Stack>
  );
};

export default PortfolioTable;
