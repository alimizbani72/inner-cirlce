"use client";

import type { Slide, SlideImage, SlideVideo } from "yet-another-react-lightbox";

import { type ChangeEvent, useState } from "react";

import { Box, Card, Container, FormControl, FormControlLabel, FormLabel, Switch, Typography } from "@mui/material";
import Image from "@/components/Image";
import { Stack } from "@mui/material";
import { useLightBox } from "@/hooks/useLightBox";
import { Lightbox } from "@/components/lightbox";

const images = [...Array(4)].map((_, index) => ({
  src: `/assets/images/mock/cover/cover-${index + 1}.webp`,
  title: "Bij7n",
  description: "Tony Montana \n Joe Pesh, John, Jax",
}));

const slides: Slide[] = [
  ...images,
  {
    type: "video",
    width: 1280,
    height: 720,
    poster: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    sources: [
      {
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video/mp4",
      },
    ],
  },
];

export function LightboxSection() {
  const lightbox = useLightBox(slides);

  const [state, setState] = useState({
    disableZoom: false,
    disableVideo: false,
    disableTotal: false,
    disableCaptions: false,
    disableSlideshow: false,
    disableThumbnails: false,
    disableFullscreen: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Container
        sx={{
          mt: 10,
          mb: 15,
          gap: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card sx={{ display: "flex" }}>
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            sx={{ p: 3 }}
          >
            {slides.map((slide) => {
              const thumbnail = slide.type === "video" ? (slide as SlideVideo).poster : (slide as SlideImage).src;

              return (
                <Image
                  key={thumbnail}
                  alt={thumbnail}
                  src={thumbnail}
                  ratio="1/1"
                  onClick={() => lightbox.onOpen(`${thumbnail}`)}
                  sx={{ borderRadius: 1, cursor: "pointer", width: 200 }}
                />
              );
            })}
          </Box>

          <Stack
            sx={{
              p: 2.5,
              width: 320,
              flexShrink: 0,
              borderLeft: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <FormControl component="fieldset" variant="standard">
              <Stack spacing={2}>
                <FormLabel component="legend">Controls</FormLabel>

                <FormControlLabel
                  control={
                    <Switch size="small" name="disableZoom" checked={state.disableZoom} onChange={handleChange} />
                  }
                  label={
                    <Typography variant="p2-regular" color="grey.dark">
                      Disable zoom
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch size="small" name="disableTotal" checked={state.disableTotal} onChange={handleChange} />
                  }
                  label={
                    <Typography variant="p2-regular" color="grey.dark">
                      Disable total
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch size="small" name="disableVideo" checked={state.disableVideo} onChange={handleChange} />
                  }
                  label={
                    <Typography variant="p2-regular" color="grey.dark">
                      Disable video
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      name="disableCaptions"
                      checked={state.disableCaptions}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="p2-regular" color="grey.dark">
                      Disable captions
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      name="disableSlideshow"
                      checked={state.disableSlideshow}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="p2-regular" color="grey.dark">
                      Disable slideshow
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      name="disableThumbnails"
                      checked={state.disableThumbnails}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="p2-regular" color="grey.dark">
                      Disable thumbnails
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      size="small"
                      name="disableFullscreen"
                      checked={state.disableFullscreen}
                      onChange={handleChange}
                    />
                  }
                  label={
                    <Typography variant="p2-regular" color="grey.dark">
                      Disable fullscreen
                    </Typography>
                  }
                />
              </Stack>
            </FormControl>
          </Stack>
        </Card>
      </Container>

      <Lightbox
        open={lightbox.open}
        close={lightbox.onClose}
        slides={slides}
        index={lightbox.selected}
        disableZoom={state.disableZoom}
        disableTotal={state.disableTotal}
        disableVideo={state.disableVideo}
        disableCaptions={state.disableCaptions}
        disableSlideshow={state.disableSlideshow}
        disableThumbnails={state.disableThumbnails}
        disableFullscreen={state.disableFullscreen}
      />
    </>
  );
}
