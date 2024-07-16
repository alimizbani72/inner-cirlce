"use client";

import { Box } from "@mui/material";
import { useIsMobile } from "@/hooks/use-responsive";
import SecretHuntsMobile from "./Mobile";
import SecretHuntsDesktop from "./Desktop";

// ----------------------------------------------------------------------

const SecretHuntsSection = () => {
  const isMobile = useIsMobile();
  return <Box sx={{ flex: 1 }}>{isMobile ? <SecretHuntsMobile /> : <SecretHuntsDesktop />}</Box>;
};

export default SecretHuntsSection;
