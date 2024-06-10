import type { FC } from "react";
import LandingContainer from "./LandingContainer";
import { Box, Button, Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/use-responsive";
import { Icon } from "@/components/icons";
import { Stack } from "@mui/system";

const data = [
  {
    id: "operating-on-emotions",
    title: "Operating on emotions (greed & fear).",
    icon: "Face",
  },
  {
    id: "playing-against-giants",
    title: "Playing the game against giants in the industry without financial experience.",
    icon: "King",
  },
  {
    id: "lack-of-insider-info",
    title: "Do not have insider information to find the 100x projects early enough.",
    icon: "No-Information",
  },
  {
    id: "entry-exit-timing",
    title: "Enter or exit too late and get pulled into the many traps.",
    icon: "Arrow",
  },
  {
    id: "lack-of-time-or-knowledge",
    title: "Don't have the time or knowledge to analyze the market well enough to make good decisions.",
    icon: "Chart",
  },
];

interface ProblemsProps {}

const Problems: FC<ProblemsProps> = () => {
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
          Problem
        </Typography>

        <Typography variant="h1-medium" textAlign={"center"} textTransform="capitalize">
          Why will 95%+ of people still
          <br />
          <Typography variant="h1-medium" color="danger.main">
            lose money?
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
        {data.map((item) => (
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
              <Icon name={item.icon as any} size={isMobile ? 32 : 40} />
            </Stack>
            <Typography flex={1} variant="h4-regular">
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Button
        href="/login"
        fullWidth={isMobile}
        size="large"
        endIcon={<Icon name="Arrow-right" />}
        sx={{ position: "relative", zIndex: 4 }}
      >
        Join To ChainMind
      </Button>
    </LandingContainer>
  );
};

export default Problems;
