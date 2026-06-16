"use client";

import RiveComp from "@/components/rive-loader";
import { plans } from "@/configs/plans";
import { useTranslate } from "@/locales";
import { toTitleCase } from "@/utils/change-case";
import { formatCurrencyWithoutDollar } from "@/utils/toNumber";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";

interface PaymentReceiptProps {
  planType: string;
}

const PaymentReceipt: FC<PaymentReceiptProps> = ({ planType }) => {
  const { t } = useTranslate();
  const searchParams = useSearchParams();

  const symbol = searchParams.get("symbol") || "USDC";

  // 🔹 Dummy price data (replace API)
  const priceData = {
    data: {
      amount: planType === "whale" ? 30 : planType === "sharp" ? 20 : 10,
      currency_code: symbol,
    },
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      {/* Main Content */}
      <Stack>
        <Typography mb={{ md: 4, xs: 3 }} variant="p2-medium">
          {`${t("checkout.subscribeTo")} “${toTitleCase(planType)}” ${t("checkout.plan")}.`}
        </Typography>

        <Stack
          alignItems="center"
          pt={5}
          direction={{ md: "column", xs: "row" }}
          gap={{ md: 0, xs: 2 }}
          mb={{ md: 4, xs: 3 }}
        >
          <Box width={{ md: 248, xs: 96 }} height={{ md: 248, xs: 96 }}>
            <RiveComp src={plans[planType as keyof typeof plans]?.rive} />
          </Box>

          <Stack flex={1} gap={{ md: 1 }} alignItems={{ md: "center" }}>
            <Typography variant="p1-semi-bold">
              {toTitleCase(planType)}
            </Typography>
            <Typography variant="p2-medium" color="rgba(255, 255, 255, 0.64)">
              {t("checkout.diveDeepText")}
            </Typography>
          </Stack>
        </Stack>

        <Stack gap={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="p2-medium" textTransform="uppercase">
              {t("checkout.subTotal")}
            </Typography>
            <Stack direction="row" gap={1}>
              <Typography variant="p1-semi-bold">
                {formatCurrencyWithoutDollar(priceData.data.amount)}
              </Typography>
              <Typography variant="p1-semi-bold">
                {priceData.data.currency_code}
              </Typography>
            </Stack>
          </Stack>

          <Divider flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="p2-medium" textTransform="uppercase">
              {t("checkout.totalPayment")}
            </Typography>
            <Stack direction="row" gap={1}>
              <Typography variant="p1-semi-bold" fontSize={20}>
                {formatCurrencyWithoutDollar(priceData.data.amount)}
              </Typography>
              <Typography variant="p1-semi-bold" fontSize={20}>
                {priceData.data.currency_code}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Footer */}
      <Stack display={{ xs: "none", md: "flex" }} direction="row" spacing={3}>
        <Typography variant="caption-semi-bold">
          {t("checkout.PoweredByChainMind")}
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            border: "1.5px solid rgba(255, 255, 255, 0.08)",
            height: "16px",
          }}
        />
        <Typography variant="caption-medium">{t("checkout.legal")}</Typography>
      </Stack>
    </Stack>
  );
};

export default PaymentReceipt;
