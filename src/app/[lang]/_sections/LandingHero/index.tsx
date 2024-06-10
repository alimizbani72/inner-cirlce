import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import type { FC } from "react";
import Illustration from "./Illustration";
import LandingContainer from "../LandingContainer";
import HiddenGems from "./HiddenGems";
import { useIsMobile } from "@/hooks/use-responsive";
import { Icon } from "@/components/icons";

interface LandingHeroProps {}

const LandingHero: FC<LandingHeroProps> = () => {
  const isMobile = useIsMobile();

  return (
    <LandingContainer
      minHeight={"calc(100vh - 105px)"}
      direction={{ md: "row" }}
      gap={{ md: 10, xs: 6 }}
      py={{ md: 3, xs: 8 }}
      alignItems={"center"}
    >
      <Stack flex={1} alignItems={{ md: "flex-start", xs: "center" }}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ borderRadius: 1.5, backgroundColor: "dark.3" }}
          px={1}
          height={24}
          mb={3}
        >
          <Typography
            variant="caption-semi-bold"
            sx={{
              background: (theme) => theme.palette.gradient.pink,
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Bullrun 2024-2025
          </Typography>
        </Stack>

        <Typography variant="h1-semi-bold" mb={2} textAlign={{ md: "left", xs: "center" }}>
          From Zero to 100X without the Sweat!
        </Typography>
        <Typography variant="p1-regular" color="grey.light" textAlign={{ md: "left", xs: "center" }}>
          Unlock the Secret with Expert Crypto Guidance Zero Guesswork!
        </Typography>

        <Stack py={{ md: 5, xs: 3 }} maxWidth={"100%"}>
          <HiddenGems />
        </Stack>

        <Button href="/login" fullWidth={isMobile} size="large" endIcon={<Icon name="Arrow-right" />}>
          Join To ChainMind
        </Button>
      </Stack>
      <Stack flex={1} width={"100%"}>
        <Illustration />
      </Stack>
    </LandingContainer>
  );
};

export default LandingHero;
