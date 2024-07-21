"use client";

import { Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import ActivePlan from "./ActivePlan";
import PlanCard from "./PlanCard";
import Scrollbar from "@/components/Scrollbar";
import { useAppSelector } from "@/lib/hooks";
import { isSidebarCollapsed } from "@/lib/features/menu/menuSlice";
import PricingTable from "./PricingTable";
import { selectPlans, selectRows } from "@/lib/features/plans/plansSlice";
import {
  useAccountServiceAuthUserinfoQuery,
  useFinancialServiceFinancialPayCreateMutation,
  useFinancialServiceFinancialPaymentsActiveQuery,
} from "@minecraft/queries";
import { getUserPlanType } from "@/consts";
import { plans } from "@/configs/plans";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { enqueueSnackbar } from "notistack";
import ActiveNotice from "./ActiveNotice";

const PricingSection: FC = () => {
  const { t } = useTranslate();
  const [open, setOpen] = useState("");
  const { data: userInfo } = useAccountServiceAuthUserinfoQuery();
  const { push } = useAppRouter();
  const { refetch, data, isSuccess } = useFinancialServiceFinancialPaymentsActiveQuery(undefined, {
    enabled: false,
    retry: false,
  });
  const { mutateAsync, isPending } = useFinancialServiceFinancialPayCreateMutation();
  const handleOnContinue = () => {
    push(`/checkout/qr-wallet?plan_type=${data?.data?.plan_type}&id=${data?.data?.id}`);
  };
  const handleCheckActivePayment = async (plan_type: string) => {
    try {
      await refetch();
      if (isSuccess && data?.data?.id) {
        setOpen(plan_type);
      } else {
        await handlePay(plan_type);
      }
    } catch (error) {
      enqueueSnackbar({ message: error?.body?.message, variant: "error" });
    }
  };
  const handlePay = async (plan_type: string) => {
    try {
      const response = await mutateAsync({ requestBody: { plan_type, symbol: "USDC" } });
      push(`/checkout/qr-wallet?plan_type=${plan_type}&id=${(response as any)?.data?.id}`);
      setOpen("");
    } catch (error) {
      enqueueSnackbar({ message: error?.body?.message, variant: "error" });
      setOpen("");
    }
  };
  const isCollapsed = useAppSelector(isSidebarCollapsed);
  const plansData = useAppSelector(selectPlans);
  const rows = useAppSelector(selectRows);
  return (
    <>
      <Stack
        sx={{
          ".os-scrollbar-handle": {
            cursor: "pointer",
            backgroundColor: "grey.dark",
            "&:hover": { backgroundColor: "grey.dark" },
          },
        }}
      >
        <ActivePlan />

        <Stack
          py={{ md: 4, xs: 3 }}
          maxWidth={{ md: `calc(100vw - ${isCollapsed ? 104 : 248}px)`, xs: "100vw" }}
          overflow={"hidden"}
          gap={4}
        >
          <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
            <Stack
              direction={"row"}
              gap={3}
              px={{ md: 4, xs: 3 }}
              pb={3}
              minWidth={{ md: "calc(1128px + 64px)", xs: "calc(1128px + 48px)" }}
            >
              {plansData.map((plan) => (
                <PlanCard
                  handlePayment={handleCheckActivePayment}
                  isPending={isPending}
                  key={plan.id}
                  {...plan}
                  disabled={
                    plans[getUserPlanType(userInfo) as keyof typeof plans].order >=
                    plans[plan.plan_type as keyof typeof plans].order
                  }
                />
              ))}
            </Stack>
          </Scrollbar>

          <Stack gap={2}>
            <Typography px={{ md: 4, xs: 3 }} variant="h4-semi-bold">
              {t("plan.compares")}
            </Typography>
            <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
              <Stack minWidth={{ md: "calc(1128px + 64px)", xs: "calc(1128px + 48px)" }} pb={3} px={{ md: 4, xs: 3 }}>
                <PricingTable
                  plansData={plansData}
                  rows={rows}
                  userType={getUserPlanType(userInfo)}
                  handlePayment={handleCheckActivePayment}
                  isPending={isPending}
                />
              </Stack>
            </Scrollbar>
          </Stack>
        </Stack>
      </Stack>
      <ActiveNotice open={open} onClose={() => setOpen("")} handlePay={handlePay} handleOnContinue={handleOnContinue} />
    </>
  );
};

export default PricingSection;
