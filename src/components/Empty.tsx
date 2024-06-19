import type { BoxProps } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import type React from "react";
import { Icon } from "./icons";

type Props = {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  sx?: BoxProps["sx"];
};

const Empty: FC<Props> = ({ icon, title = "There is nothing to show!", subtitle, sx }) => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: { md: 6 }, p: 6, ...sx }}>
      <Stack alignItems="center" justifyContent="center" borderRadius="110px" mb={3}>
        {icon || <Icon name="Danger" size={40} />}
      </Stack>

      <Typography variant="h4-medium" color="white" textAlign="center">
        {title}
      </Typography>

      {subtitle && (
        <Typography mt="12px" color="white" variant="p2-regular" textAlign="center">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default Empty;
