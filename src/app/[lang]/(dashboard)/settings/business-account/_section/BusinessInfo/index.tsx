"use client";
import { Stack } from "@mui/material";
import AccountInfo from "./AccountInfo";
import AccountContract from "./AccountContract";

const BusinessInfo = () => {
  return (
    <Stack width={1} gap={2}>
      <AccountInfo />

      <AccountContract />
    </Stack>
  );
};

export default BusinessInfo;
