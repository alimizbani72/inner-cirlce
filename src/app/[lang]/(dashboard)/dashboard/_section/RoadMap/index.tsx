import ContentStack from "@app/_components/ContentStack";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import RoadMapItem from "./Item";

interface RoadMapProps {}
const rm = [
  { id: 1, title: "Lunch ChainMind Mobile App", date: "March, 2024" },
  { id: 2, title: "Lunch ChainMind Mobile App", date: "March, 2024" },
  { id: 3, title: "Lunch ChainMind Mobile App", date: "March, 2024" },
];

const RoadMap: FC<RoadMapProps> = () => {
  return (
    <ContentStack sx={{ gap: 3 }}>
      <Typography variant="p1-semi-bold">Road Map</Typography>

      <Stack
        sx={{
          gap: { md: 2, xs: 1 },
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        {rm.map((i, index) => (
          <RoadMapItem key={i.id} {...i} isOdd={!!(index % 2)} />
        ))}
      </Stack>
    </ContentStack>
  );
};

export default RoadMap;
