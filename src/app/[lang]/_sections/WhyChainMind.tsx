import { Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import SectionTitle from "./SectionTitle";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import LandingContainer from "./LandingContainer";

const data = [
  {
    id: "operating-emotions",
    title: "A team of highly professional analysts and crypto experts working for you.",
    icon: "Team",
  },
  {
    id: "playing-giants",
    title: "Immediate access to actual market movements to make decisions fast.",
    icon: "Chart",
  },
  {
    id: "lack-of-info",
    title: "You can get a chance to access top-secret gems early.",
    icon: "Coin-reports",
  },
  {
    id: "entry-timing",
    title: "How to create a balanced portfolio considering a healthy risk to profit ratio.",
    icon: "Portfolio",
  },
  {
    id: "lack-of-or-knowledge",
    title: "Buy and Exit strategies can help you avoid emotional decisions and losing all your money.",
    icon: "Arrow",
  },
  {
    id: "lack-or-knowledge",
    title: "Connect with a community of people who share experiences, knowledge, and opportunities.",
    icon: "Community",
  },
];

interface WhyChainMindProps {}

const WhyChainMind: FC<WhyChainMindProps> = () => {
  const isMobile = useIsMobile();

  return (
    <Stack
      width={{ md: "calc(100% - 32px)", xs: "calc(100% - 16px)" }}
      mx={{ md: 2, xs: 1 }}
      sx={{ background: "linear-gradient(180deg, #CDDFF2 0%, #F6FAFF 100%)", borderRadius: { md: 4, xs: 3 } }}
      py={{ md: 12, xs: 8 }}
      alignItems={"center"}
    >
      <LandingContainer alignItems={"center"} gap={{ md: 6, xs: 4 }}>
        <SectionTitle
          title={`Why <span style="color: #FF409D">C</span>hainMind`}
          bigTypoColor="rgba(7, 7, 32, 0.03)"
          color="dark.1"
          firsLetterColor="dark.1"
        />

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
              borderColor={"white"}
              flex={{ md: "1 1 calc(50% - 32px)" }}
              alignItems={{ md: "center" }}
              sx={{
                background: "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.40) 100%)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                width={{ md: 64, xs: 56 }}
                height={{ md: 64, xs: 56 }}
                bgcolor={"white"}
                boxShadow={"0px 16px 16px 0px rgba(7, 7, 32, 0.04)"}
                borderRadius={1.5}
                sx={{ path: { stroke: (theme) => theme.palette.dark[1] } }}
              >
                <Icon name={item.icon as any} size={isMobile ? 32 : 40} />
              </Stack>
              <Typography flex={1} color="dark.1" variant="h4-medium">
                {item.title}
              </Typography>
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

export default WhyChainMind;
