import { Stack } from "@mui/material";
import ChannelCard from "./ChannelCard";
import WhaleCard from "./WhaleCard";

const TelegramChannelSection = () => {
  return (
    <>
      <Stack direction={{ md: "row", xs: "column" }} spacing={3}>
        <ChannelCard />
        <WhaleCard />
      </Stack>
    </>
  );
};

export default TelegramChannelSection;
