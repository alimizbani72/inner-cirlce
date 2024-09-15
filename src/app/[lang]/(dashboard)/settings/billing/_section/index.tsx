"use client";
import { Stack, Typography } from "@mui/material";
import BillingInfo from "./BillingInfo";
import BillingHistory from "./BillingHistory";

const BillingSection = () => {
  return (
    <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          Billing
        </Typography>
      </Stack>

      <Stack width={1} gap={2}>
        <BillingInfo />

        <BillingHistory />
      </Stack>
    </Stack>
  );
};

export default BillingSection;
