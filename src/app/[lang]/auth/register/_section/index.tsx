"use client";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

const RegisterSection: FC = () => {
  return (
    <Box sx={{ px: 19, py: 8 }}>
      <Stack>
        <Typography variant="h3-semi-bold">Create your account</Typography>
      </Stack>
    </Box>
  );
};
export default RegisterSection;
