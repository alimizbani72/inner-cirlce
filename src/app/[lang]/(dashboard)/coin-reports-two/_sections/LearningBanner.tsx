"use client";
import { Icon } from "@/components/icons";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslate } from "@/locales";
import LearningDialog from "@app/_components/LearningDialog";
import { useGlobalVideoGlobalServiceGetGlobalsVideoGlobal } from "@cms/queries";
import { useAppSelector } from "@/lib/hooks";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { usePathname } from "next/navigation";
import { convertRoute } from "@/utils/string";
import { useIsMobile } from "@/hooks/use-responsive";

const LearningBanner = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const pathName = usePathname();
  const lang = useAppSelector(selectLang);
  const { data } = useGlobalVideoGlobalServiceGetGlobalsVideoGlobal({ locale: lang });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const vid = data?.videos?.filter((item: any) => item.videoPage === convertRoute(pathName));

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
          <img src="/assets/texture.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
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
              <Box sx={{ width: "100%", height: "30%", bgcolor: "blue.dark" }} />
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
              <Icon name="Play" />
            </Box>
          ) : (
            <Button color="info" size="large" startIcon={<Icon name="Play" />} onClick={() => setOpen(true)}>
              {t("learningBanner.buttonText")}
            </Button>
          )}
        </Stack>
      </Stack>
      <LearningDialog open={open} close={handleClose} videoLink={vid[0].videoLink} title={vid[0].title} />
    </>
  );
};

export default LearningBanner;
