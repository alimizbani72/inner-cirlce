import { Box, Button, Stack } from "@mui/material";
import type { FC } from "react";
import SectionTitle from "../SectionTitle";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import LandingContainer from "../LandingContainer";
import ResultsCoin from "./ResultsCoin";
import { useTranslate } from "@/locales";

interface ResultsProps {}

const Results: FC<ResultsProps> = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  return (
    <Stack
      width={{ md: "calc(100% - 32px)", xs: "calc(100% - 16px)" }}
      mx={{ md: 2, xs: 1 }}
      sx={{ background: "linear-gradient(184deg, #779DFF 3.51%, #565CE4 96.49%)", borderRadius: { md: 4, xs: 3 } }}
      py={{ md: 12, xs: 8 }}
      alignItems={"center"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.5 }}>
        <img src="/assets/svg/checkout-flares.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          zIndex: 3,
          height: 600,
        }}
      >
        <img src="/assets/svg/payment-stars.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Stack alignItems={"center"} width={"100%"} position={"relative"} zIndex={3}>
        <SectionTitle title="Results" bigTypoColor="rgba(255, 255, 255, 0.08)" color="white" firsLetterColor="white" />

        <Stack py={{ md: 5, xs: 3 }} ml={{ md: "unset", xs: "-13px" }} maxWidth={"100%"}>
          <ResultsCoin />
        </Stack>

        <LandingContainer alignItems={"center"}>
          <Button href="/login" fullWidth={isMobile} size="large" endIcon={<Icon name="Arrow-right" />}>
            {t("how.joinTo")} ChainMind
          </Button>
        </LandingContainer>
      </Stack>
    </Stack>
  );
};

export default Results;
