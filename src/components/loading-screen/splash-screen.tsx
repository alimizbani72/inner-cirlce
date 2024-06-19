import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Loading from "../Loading";

// ----------------------------------------------------------------------

export default function SplashScreen({ sx, ...other }: BoxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        right: 0,
        width: 1,
        bottom: 0,
        height: 1,
        zIndex: 9998,
        display: "flex",
        position: "fixed",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.dark",
        ...sx,
      }}
      {...other}
    >
      <Loading size={80} />
    </Box>
  );
}
