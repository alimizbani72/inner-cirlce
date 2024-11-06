"use client";
import { Icon } from "@/components/icons";
import useToggleState from "@/hooks/use-toggle-state";
import { Box, Button, IconButton, Stack } from "@mui/material";
import VideoModal from "./VideoModal";
import { useTranslate } from "@/locales";

const ButtonAction = () => {
  const { t } = useTranslate();
  const [isopenWatchVideo, toggleWatchVideo] = useToggleState();
  const [isopenHowToBuy, toggleHowToBuy] = useToggleState();

  return (
    <>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Button
          color="info"
          size="small"
          sx={{ whiteSpace: "pre", px: { xs: "12px", md: "24px" } }}
          onClick={toggleWatchVideo}
        >
          {t("coinreportsingleview.watchVideo")}
        </Button>
        <Button
          color="info"
          size="small"
          sx={{ whiteSpace: "pre", px: { xs: "12px", md: "24px" } }}
          onClick={toggleHowToBuy}
        >
          {t("coinreportsingleview.howTobuy")}
        </Button>
        <Box sx={{ p: 0.3, borderRadius: "50%", border: "1px solid", borderColor: "dark.3" }}>
          <IconButton>
            <Icon name="website" />
          </IconButton>
        </Box>
      </Stack>
      {isopenHowToBuy && (
        <VideoModal
          title={t("coinreportsingleview.howTobuy")}
          videoLink="https://vimeo.com/971459462?share=copy"
          open={isopenHowToBuy}
          close={toggleHowToBuy}
        />
      )}
      {isopenWatchVideo && (
        <VideoModal
          title={t("coinreportsingleview.watchVideo")}
          videoLink="https://vimeo.com/971459462?share=copy"
          open={isopenWatchVideo}
          close={toggleWatchVideo}
        />
      )}
    </>
  );
};

export default ButtonAction;
