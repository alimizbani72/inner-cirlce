import RiveComp from "@/components/RiveComp";
import { plans } from "@/configs/plans";
import { useTranslate } from "@/locales";
import { toPascalCase } from "@/utils/change-case";
import { Box, Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface PaymentReceiptProps {
  planType: string;
}

const PaymentReceipt: FC<PaymentReceiptProps> = ({ planType }) => {
  const { t } = useTranslate();
  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      {/* Main Content */}
      <Stack>
        <Typography mb={{ md: 4, xs: 3 }} variant="p2-medium">
          {`${t("checkout.subscribeTo")} “${toPascalCase(planType)}” ${t("checkout.plan")}.`}
        </Typography>

        <Stack
          alignItems={"center"}
          pt={5}
          direction={{ md: "column", xs: "row" }}
          gap={{ md: 0, xs: 2 }}
          mb={{ md: 4, xs: 3 }}
        >
          <Box width={{ md: 248, xs: 96 }} height={{ md: 248, xs: 96 }}>
            <RiveComp src={plans[planType as keyof typeof plans]?.rive} />
          </Box>

          <Stack flex={1} gap={{ md: 1 }} alignItems={{ md: "center" }}>
            <Typography variant="p1-semi-bold">{planType}</Typography>
            <Typography variant="p2-medium" color={"rgba(255, 255, 255, 0.64)"}>
              {t("checkout.diveDeepText")}
            </Typography>
          </Stack>
        </Stack>

        <Stack gap={2}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="p2-medium" textTransform={"uppercase"}>
              {t("checkout.subTotal")}
            </Typography>
            <Typography variant="p1-semi-bold">$5,000.00</Typography>
          </Stack>
          <Divider flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="p2-medium" textTransform={"uppercase"}>
              {t("checkout.dutiesTaxes")}
            </Typography>
            <Typography variant="p1-semi-bold">$40</Typography>
          </Stack>
          <Divider flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="p2-medium" textTransform={"uppercase"}>
              {t("checkout.totalPayment")}
            </Typography>
            <Typography variant="p1-semi-bold" fontSize={20}>
              $5,040.00
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* Powered by ChainMind Section visible only on desktop, aligned to bottom */}
      <Stack display={{ xs: "none", md: "flex" }} direction={"row"} spacing={3}>
        <Typography variant="caption-semi-bold">{t("checkout.PoweredByChainMind")}</Typography>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ border: "1.5px solid rgba(255, 255, 255, 0.08)", height: "16px" }}
        />
        <Typography variant="caption-medium">{t("checkout.legal")}</Typography>
      </Stack>
    </Stack>
  );
};

export default PaymentReceipt;
