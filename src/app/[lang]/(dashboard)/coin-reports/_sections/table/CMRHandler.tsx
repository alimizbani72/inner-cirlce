import { Icon } from "@/components/icons";
import { IconButton, Stack, Typography } from "@mui/material";
import type { Palette } from "@mui/material/styles";

import type { FC } from "react";

type CMRHandlerProps = {
  value: number | null;
  percentChange?: number | null;
};

const CMRHandler: FC<CMRHandlerProps> = ({ value, percentChange }) => {
  let color = "common.white";
  let iconName: "Arrow-up" | "Arrow-down" | null = null;

  if (percentChange && percentChange > 0) {
    color = "success";
    iconName = "Arrow-up";
  } else if (percentChange && percentChange < 0) {
    color = "danger";
    iconName = "Arrow-down";
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="p2-medium">{value?.toString()?.slice(0, 5)}</Typography>
      {percentChange !== null && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            ...(iconName
              ? {
                  path: { stroke: (theme) => (theme.palette[color as keyof Palette] as any)?.main },
                }
              : {}),
          }}
        >
          {iconName ? <Icon name={iconName} /> : <IconButton></IconButton>}
          <Typography
            sx={{ color: (theme) => (theme.palette[color as keyof Palette] as any)?.main }}
            variant="caption-semi-bold"
          >
            {percentChange?.toString()?.slice(0, 5)}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default CMRHandler;
