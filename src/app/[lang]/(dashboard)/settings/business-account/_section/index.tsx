"use client";
import { Stack, Typography } from "@mui/material";
import RequestCard from "./RequestCard";
import BusinessInfo from "./BusinessInfo";

const status = true;

const BusinessAccountSection = () => {
  return (
    <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          Business Account
        </Typography>
      </Stack>

      {status ? <BusinessInfo /> : <RequestCard />}
    </Stack>
  );
};

export default BusinessAccountSection;
