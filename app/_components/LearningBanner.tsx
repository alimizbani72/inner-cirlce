"use client";
import Icon from "@/components/icon";
import { useIsMobile } from "@/hooks/use-responsive";
import { useGetGlobalsVideoGlobal } from "@/services/minecraft/default/default";
import { convertRoute } from "@/utils/string";
import { Box, Button, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LearningDialog from "./LearningDialog";

const LearningBanner = () => {
  const isMobile = useIsMobile();
  const pathName = usePathname();
  // const lang = useAppSelector(selectLang);
  const { data } = useGetGlobalsVideoGlobal();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const vid = data?.data?.videos?.filter(
    (item: any) => item.videoPage === convertRoute(pathName),
  );

  if (!vid?.length) {
    return null;
  }

  return (
    <>
      <Stack
        sx={{
          position: "relative",
          overflow: "hidden",
          mx: { md: 4, xs: 3 },
          mb: "0 !important",
          borderRadius: 2,
          border: "1.5px solid",
          borderColor: "dark.3",
        }}
      >
        <Box
          sx={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)",
            width: { md: 400, xs: 288 },
            height: { md: 400, xs: 288 },
            borderRadius: { md: "400px", xs: "288px" },
            position: "absolute",
            left: { md: "-200px", xs: "-144px" },
            top: { md: "-100px", xs: "-144px" },
            filter: "blur(140px)",
          }}
        />

        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <img
            src="/assets/svg/texture.svg"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box
          sx={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
            width: { md: 400, xs: 288 },
            height: { md: 400, xs: 288 },
            borderRadius: { md: "400px", xs: "288px" },
            position: "absolute",
            right: { md: "-200px", xs: "-144px" },
            top: { md: "-100px", xs: "unset" },
            bottom: { md: "unset", xs: "-144px" },
            filter: "blur(140px)",
          }}
        />

        <Stack
          sx={{
            p: 2,
            position: "relative",
            zIndex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: { md: undefined, xs: 6 },
          }}
        >
          <Stack gap={2} direction="row">
            <Box
              sx={{
                width: "2px",
                bgcolor: "dark.1",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ width: "100%", height: "30%", bgcolor: "blue.dark" }}
              />
            </Box>
            <Typography variant="p1-semi-bold">{vid[0].title}</Typography>
          </Stack>

          {isMobile ? (
            <Box
              onClick={() => setOpen(true)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "dark.1",
                borderRadius: "50%",
                p: 1.5,
              }}
            >
              <Icon name="PlayIcon" />
            </Box>
          ) : (
            <Button
              color="tertiary"
              size="large"
              startIcon={<Icon name="PlayIcon" />}
              onClick={() => setOpen(true)}
            >
              Watch Video
            </Button>
          )}
        </Stack>
      </Stack>
      <LearningDialog
        open={open}
        close={handleClose}
        videoLink={vid[0].videoLink ?? ""}
        title={vid[0].title ?? ""}
      />
    </>
  );
};

export default LearningBanner;
