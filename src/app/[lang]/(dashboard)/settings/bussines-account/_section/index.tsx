"use client";
import { Stack, Typography } from "@mui/material";

const BusinessAccountSection = () => {
  return (
    <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          Business Account
        </Typography>
      </Stack>

      <Stack maxWidth={{ md: 360 }} gap={3} justifyContent={"center"} alignItems={"center"}></Stack>
    </Stack>
  );
};

export default BusinessAccountSection;
