"use client";
import { Button, Stack, Typography } from "@mui/material";
import BillingInfo from "./BillingInfo";
import BillingHistory from "./BillingHistory";
import { useFinancialServiceBillingAddressQuery } from "@minecraft/queries";
import { Icon } from "@/components/icons";
import { useState } from "react";
import BillingAddressDialog from "./BillingAddressDialog";
import { useTranslate } from "@/locales";

const BillingSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { data } = useFinancialServiceBillingAddressQuery();
  const { t } = useTranslate();

  return (
    <>
      <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
        <Stack width={1} gap={2} justifyContent="space-between" alignItems={{ md: "center" }} direction={{ md: "row" }}>
          <Typography variant="p1-medium" color="white">
            {t("billinghistory.billing")}
          </Typography>

          <Button
            size="large"
            color={data?.data?.address ? "info" : "secondary"}
            startIcon={<Icon name="Pen" />}
            onClick={() => setOpenDialog(true)}
          >
            {data?.data?.address ? t("billinghistory.changeInfo") : t("billinghistory.setupbilling")}
          </Button>
        </Stack>

        <Stack width={1} gap={2}>
          <BillingInfo />

          <BillingHistory />
        </Stack>
      </Stack>

      {openDialog && <BillingAddressDialog open={openDialog} close={() => setOpenDialog(false)} info={data?.data} />}
    </>
  );
};

export default BillingSection;
