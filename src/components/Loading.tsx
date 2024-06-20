import type { BoxProps } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import RiveComp from "./RiveComp";

type Props = {
  title?: string;
  sx?: BoxProps["sx"];
  size?: number;
};

const Loading: FC<Props> = ({ title = "On loading...", size = 60, sx }) => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ mt: { md: 6 }, p: 6, gap: 2, ...sx }}>
      <Box sx={{ aspectRatio: 1 }}>
        <RiveComp width={size} height={size} src="/assets/rive/chainmind_loading.riv" />
      </Box>

      <Typography variant="p1-semi-bold" color="white" textAlign="center">
        {title}
      </Typography>
    </Stack>
  );
};

export default Loading;
