import { Box, Typography } from "@mui/material";
import { timeFrameOptions } from "../consts";
import { Fragment } from "react";
import { Stack } from "@mui/material";

interface TimeFramesProps {
  value?: string;
  onChange: (value: string) => void;
}

const TimeFrames = ({ onChange, value }: TimeFramesProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      sx={{ p: 1, height: 40, bgcolor: "dark.3", borderRadius: 2.5, ml: "auto" }}
      gap={1}
    >
      {timeFrameOptions?.map((time, index) => (
        <Fragment key={time.value}>
          <Box
            sx={{
              ...(value === time.value && {
                bgcolor: "blue.dark",
                borderRadius: 1.5,
                px: 1,
              }),
            }}
          >
            <Typography
              variant="p2-medium"
              onClick={() => onChange(time.value)}
              sx={{
                cursor: "pointer",
                height: 24,
                px: { xs: 0.25, sm: 1 },
              }}
            >
              {time.label}
            </Typography>
          </Box>
          {index !== timeFrameOptions?.length - 1 && (
            <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "grey.light" }} />
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

export default TimeFrames;
