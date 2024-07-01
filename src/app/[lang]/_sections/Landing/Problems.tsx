import type { FC } from "react";
import LandingContainer from "./LandingContainer";
import { Box, Button, Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/use-responsive";
import { Icon } from "@/components/icons";
import { Stack } from "@mui/system";
import type { media } from "@cms/requests";
import Image from "@/components/Image";
import { CMSDownloadURL } from "@/consts";

interface ProblemsProps {
  highlightText: string;
  coloredTitle: string;
  buttonText: string;
  buttonLink: string;
  gridSections: Array<{
    icon: media;
    title: string;
    description: string;
    id?: string | null;
  }>;
  id?: string | null;
  blockName?: string | null;
  blockType: "Problem";
}

const Problems: FC<ProblemsProps> = ({
  blockType,
  buttonLink,
  buttonText,
  coloredTitle,
  gridSections,
  highlightText,
}) => {
  const isMobile = useIsMobile();

  return (
    <LandingContainer
      gap={{ md: 8, xs: 4 }}
      my={{ md: 12, xs: 8 }}
      py={{ md: 12, xs: 8 }}
      alignItems={"center"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.16 }}>
        <img src="/assets/svg/checkout-texture.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          height: 609,
          opacity: 0.16,
        }}
      >
        <img src="/assets/svg/payment-stars.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(255, 87, 87, 0.24) 0%, rgba(7, 7, 32, 0.00) 100%)",
          width: 968,
          height: 968,
          borderRadius: "968px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(140px)",
        }}
      />

      <Stack gap={3} alignItems={"center"} position={"relative"} zIndex={4}>
        <Typography
          variant="p2-semi-bold"
          sx={{
            background: (theme) => theme.palette.gradient.orange,
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          {blockType}
        </Typography>

        <Typography variant={isMobile ? "h3-medium" : "h1-medium"} textAlign={"center"} textTransform="capitalize">
          {highlightText}
          {isMobile ? " " : <br />}
          <Typography variant={isMobile ? "h3-medium" : "h1-medium"} color="danger.main">
            {coloredTitle}
          </Typography>
        </Typography>
      </Stack>

      <Stack
        direction={{ md: "row" }}
        flexWrap={{ md: "wrap" }}
        position={"relative"}
        zIndex={4}
        gap={{ md: 4, xs: 2 }}
      >
        {gridSections.map((item) => (
          <Stack
            key={item.id}
            direction={{ md: "row" }}
            p={{ md: 4, xs: 3 }}
            gap={{ md: 3, xs: 2 }}
            borderRadius={2}
            border={"1px solid"}
            borderColor={"dark.3"}
            bgcolor={"dark.2"}
            flex={{ md: "1 1 calc(50% - 32px)" }}
            alignItems={{ md: "center" }}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              width={{ md: 64, xs: 56 }}
              height={{ md: 64, xs: 56 }}
              bgcolor={"dark.3"}
              borderRadius={1.5}
            >
              <Image src={CMSDownloadURL(item?.icon?.url!)} width={isMobile ? 32 : 40} height={isMobile ? 32 : 40} />
            </Stack>
            <Typography flex={1} variant="h4-regular">
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Button
        href={buttonLink}
        fullWidth={isMobile}
        size="large"
        endIcon={<Icon name="Arrow-right" />}
        sx={{ position: "relative", zIndex: 4 }}
      >
        {buttonText}
      </Button>
    </LandingContainer>
  );
};

export default Problems;
