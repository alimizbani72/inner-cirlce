import { Icon } from "@/components/icons";
import { fDate } from "@/utils/format-time";
import type { roadmaps } from "@cms/requests";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface RoadMapItemProps extends roadmaps {
  isOdd?: boolean;
}

const RoadMapItem: FC<RoadMapItemProps> = ({ title, dateOnly, isOdd }) => {
  return (
    <Stack
      gap={2}
      p={2}
      flex={1}
      direction={"row"}
      borderRadius={1.5}
      bgcolor={"dark.3"}
      alignItems={{ md: "center", xs: undefined }}
    >
      <Box
        sx={{
          width: "2px",
          height: { md: "100%", xs: undefined },
          bgcolor: "dark.1",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", height: "30%", bgcolor: isOdd ? "pink.dark" : "blue.dark" }} />
      </Box>
      <Stack gap={1} mr={{ md: undefined, xs: "auto" }}>
        <Typography variant="p2-medium">{title}</Typography>
        <Typography variant="caption-regular" color={"grey.light"}>
          {fDate(dateOnly, "dd MMM, yyyy")}
        </Typography>
      </Stack>

      <Icon name="Arrow-right" color={"grey.light"} />
    </Stack>
  );
};

export default RoadMapItem;
