"use client";

import type { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";

type Props = {
  title?: string;
  subtitle?: string;
  icon?: iconsType;
  borderRadius?: number;
};

const ComingSoon: FC<Props> = ({ title = "COMING SOON", subtitle, icon, borderRadius }) => {
  return (
    <Stack
      sx={{
        flex: 1,
        p: 4,
        overflow: "hidden",
        position: "relative",
        border: "1px solid",
        borderColor: "dark.3",
        background: "linear-gradient(180deg, #090A23 0%, rgba(9, 10, 35, 0.00) 100%)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius,
      }}
    >
      <Box
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
          width: 400,
          height: 400,
          borderRadius: "400px",
          position: "absolute",
          right: "-200px",
          top: "-100px",
          filter: "blur(140px)",
        }}
      />

      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.40) 0%, rgba(86, 92, 228, 0.40) 100%)",
          width: 400,
          height: 400,
          borderRadius: "400px",
          position: "absolute",
          left: "-200px",
          top: "-100px",
          filter: "blur(140px)",
        }}
      />

      <Box
        sx={{
          background: "rgba(0, 177, 113, 0.24)",
          width: 400,
          height: 400,
          borderRadius: "400px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "-200px",
          filter: "blur(140px)",
        }}
      />

      {icon && <Icon name={icon} size={60} />}

      <Typography variant="h3-semi-bold" mt={3} mb={1}>
        {title}
      </Typography>
      <Typography variant="p2-regular" color="grey.light" textAlign="center" maxWidth={504}>
        {subtitle}
      </Typography>
    </Stack>
  );
};

export default ComingSoon;
