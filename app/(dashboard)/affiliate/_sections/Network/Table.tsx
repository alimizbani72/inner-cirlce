"use client";

import CustomTable from "@/components/CustomTable";
import Empty from "@/components/Empty";
import Loading from "@/components/Loading";
import { Scrollbar } from "@/components/scrollbar";
import { useTranslate } from "@/locales";
import { toPascalCase } from "@/utils/change-case";
import { fDate } from "@/utils/format-time";
import { formatCurrency } from "@/utils/toNumber";
import { Stack } from "@mui/material";
import { type FC, useMemo } from "react";

const AffNetworkTabTable: FC = () => {
  const { t } = useTranslate();
  const isLoading = false;

  const data = {
    data: {
      nested_users: [
        {
          children: [
            {
              username: "john_doe",
              plan_type: "plankton",
              created_at: "2024-01-10T12:00:00Z",
              turnover: {
                value: 1200,
                currency_code: "USD",
              },
            },
            {
              username: "jane_smith",
              plan_type: "shrimp",
              created_at: "2024-02-15T09:30:00Z",
              turnover: {
                value: 3400,
                currency_code: "USD",
              },
            },
            {
              username: "crypto_king",
              plan_type: "whale",
              created_at: "2023-11-05T18:20:00Z",
              turnover: {
                value: 15000,
                currency_code: "USD",
              },
            },
            {
              username: "alice_trader",
              plan_type: "plankton",
              created_at: "2024-03-01T10:15:00Z",
              turnover: {
                value: 800,
                currency_code: "USD",
              },
            },
            {
              username: "bob_invest",
              plan_type: "shrimp",
              created_at: "2024-03-12T14:45:00Z",
              turnover: {
                value: 2600,
                currency_code: "USD",
              },
            },
            {
              username: "satoshi_dev",
              plan_type: "whale",
              created_at: "2023-12-20T08:25:00Z",
              turnover: {
                value: 22000,
                currency_code: "USD",
              },
            },
            {
              username: "neo_trade",
              plan_type: "shrimp",
              created_at: "2024-01-28T16:40:00Z",
              turnover: {
                value: 4100,
                currency_code: "USD",
              },
            },
            {
              username: "luna_flow",
              plan_type: "plankton",
              created_at: "2024-02-05T11:05:00Z",
              turnover: {
                value: 950,
                currency_code: "USD",
              },
            },
            {
              username: "mike_alpha",
              plan_type: "shrimp",
              created_at: "2024-04-09T19:10:00Z",
              turnover: {
                value: 5200,
                currency_code: "USD",
              },
            },
            {
              username: "delta_whale",
              plan_type: "whale",
              created_at: "2023-10-18T13:55:00Z",
              turnover: {
                value: 31000,
                currency_code: "USD",
              },
            },
            {
              username: "skyline_fx",
              plan_type: "shrimp",
              created_at: "2024-05-02T07:20:00Z",
              turnover: {
                value: 3700,
                currency_code: "USD",
              },
            },
          ],
        },
      ],
    },
  };
  const columns = useMemo(
    () => [
      {
        title: t("affNetworkTabTable.username"),
        modify: (row: any) => row.username,
      },
      {
        title: t("affNetworkTabTable.package"),
        modify: (row: any) => toPascalCase(row.plan_type),
      },
      {
        title: t("affNetworkTabTable.joinedDate"),
        modify: (row: any) => fDate(row.created_at, "DD.MM.YYYY"),
      },
      {
        title: t("affNetworkTabTable.moneyMade"),
        modify: (row: any) => formatCurrency(row.turnover),
      },
    ],
    [t],
  );
  if (isLoading) {
    return (
      <Stack maxWidth={{ md: "calc(100vw - 64px)", xs: "calc(100vw - 48px)" }}>
        <Loading />
      </Stack>
    );
  }
  return (
    <Stack px={{ md: 4, xs: 0 }} pt={3}>
      {data?.data?.nested_users?.length ? (
        <Scrollbar>
          <Stack
            alignItems="flex-start"
            maxWidth={{ md: "calc(100vw - 64px)", xs: "100vw" }}
          >
            <CustomTable
              columns={columns}
              data={(data?.data?.nested_users?.[0] as any)?.children}
            />
          </Stack>
        </Scrollbar>
      ) : (
        <Empty />
      )}
    </Stack>
  );
};

export default AffNetworkTabTable;
