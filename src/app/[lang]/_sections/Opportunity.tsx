import {} from "@/configs/landingMenu";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import LandingContainer from "./LandingContainer";
import SectionTitle from "./SectionTitle";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import Image from "@/components/Image";

const data = [
  {
    id: "Getting involved in crypto",
    title: "Getting involved in crypto",
    subtitle:
      "The timing of getting involved in crypto is now (but time is short as the rocket has already started to take off).",
    description:
      "Getting started in cryptocurrency investment is crucial now, as the market is already on an upward trend.",
    image: "/assets/landing/opportunity/rocket.svg",
  },
  {
    id: "This time it’s different!",
    title: "This time it’s different!",
    subtitle:
      "Trillions of dollars ready to flood into the crypto industry due to the ETF’s unlocking the biggest transfer of wealth in history.",
    description:
      "The introduction of ETFs is set to inject massive amounts of capital into the cryptocurrency market, promising unprecedented growth.",
    image: "/assets/landing/opportunity/bitcoin.svg",
  },
  {
    id: "Last chance",
    title: "Last chance",
    subtitle: "This could be the last chance to get positioned before crypto is reaching the masses.",
    description:
      "This may be the final opportunity to secure a strong position in cryptocurrency before it becomes widely adopted.",
    image: "/assets/landing/opportunity/hourglass.svg",
  },
];

interface OpportunityProps {}

const Opportunity: FC<OpportunityProps> = () => {
  const isMobile = useIsMobile();

  return (
    <Stack
      width={"calc(100% - 32px)"}
      mx={2}
      sx={{ background: "linear-gradient(180deg, #CDDFF2 0%, #F6FAFF 100%)", borderRadius: 4 }}
      py={{ md: 12, xs: 8 }}
      alignItems={"center"}
    >
      <LandingContainer gap={{ md: 6, xs: 4 }} alignItems={"center"}>
        <SectionTitle title="Opportunity" color="dark.1" firsLetterColor="pink.dark" />

        <Stack gap={{ md: 4, xs: 3 }} direction={{ md: "row" }}>
          {data.map((item) => (
            <Stack
              flex={1}
              key={item.id}
              sx={{
                overflow: "hidden",
                background: "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.40) 100%)",
                border: "1px solid",
                borderColor: "common.white",
                borderRadius: 2,
              }}
            >
              <Box flex={1}>
                <Image src={item.image} sx={{ aspectRatio: "1/1" }} width={"100%"} />
              </Box>
              <Stack gap={1.5} py={4} px={3}>
                <Typography variant="h4-semi-bold" color="dark.1">
                  {item.title}
                </Typography>
                <Typography variant="p2-medium" color="dark.1">
                  {item.subtitle}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Button href="/login" fullWidth={isMobile} size="large" endIcon={<Icon name="Arrow-right" />}>
          Join To ChainMind
        </Button>
      </LandingContainer>
    </Stack>
  );
};

export default Opportunity;
