import type { FC } from "react";
import LandingContainer from "../LandingContainer";
import { Box, Button, Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/use-responsive";
import { Icon } from "@/components/icons";
import { Stack } from "@mui/system";
import SectionTitle from "../SectionTitle";
import Image from "@/components/Image";
import { isOdd } from "@/utils/toNumber";
import PinkBar from "./PinkBar";
import BlueBar from "./BlueBar";

const data = [
  {
    id: "coin-reports",
    title: "Coin Reports",
    text: "There’s over 2 million coins/tokens in the market, how do you find the ones that will do 100x? Our team spends hundreds of hours researching projects in the market to find the hidden gems before the world gets to find out so you can get in before the potential price explosions.",
    image: "/assets/landing/how/coin-reports.svg",
  },
  {
    id: "workshops",
    title: "Workshops",
    text: "Our Experts and Analysts will work with you to develop your portfolio by choosing the right projects while having the right strategies for entry and exit to maximise your potential gains.",
    image: "/assets/landing/how/workshops.svg",
  },
  {
    id: "community",
    title: "Community",
    text: "Inner circle group where insider information will be shared and firsthand opportunities to make sure you have the right information at the right time throughout the bull market.",
    image: "/assets/landing/how/community.svg",
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    text: "AI Tools and bulletproof strategies that is exclusively available for our inner circle.",
    image: "/assets/landing/how/ai-tools.svg",
  },
  {
    id: "academy",
    title: "Academy",
    text: "Academy with an ongoing feed of videos to keep you ahead of the trends. (Coming Soon signal)",
    image: "/assets/landing/how/academy.svg",
  },
];

interface HowProps {}

const How: FC<HowProps> = () => {
  const isMobile = useIsMobile();

  return (
    <LandingContainer pt={{ md: 15, xs: 13 }} pb={{ md: 20, xs: 14 }} alignItems={"center"}>
      <SectionTitle title="How" color="white" bigTypoColor="rgba(255, 255, 255, 0.02)" firsLetterColor="blue.dark" />

      <Stack mt={{ md: 6, xs: 4 }} mb={{ md: 8, xs: 4 }} gap={{ md: 6, xs: 3 }}>
        {data.map((item, index) => (
          <Stack direction="row" alignItems={"center"} key={item.id}>
            {!isMobile &&
              (!isOdd(index) ? (
                <PinkBar />
              ) : (
                <Typography
                  ml={"5%"}
                  mr={8}
                  fontSize={88}
                  fontWeight={600}
                  lineHeight={1.5}
                  color="rgba(255, 255, 255, 0.03)"
                >
                  {`0${index + 1}`}
                </Typography>
              ))}
            <Stack
              direction={{ md: isOdd(index) ? "row" : "row-reverse" }}
              sx={{
                overflow: "hidden",
                background: "dark.2",
                border: "1.5px solid",
                borderColor: "dark.3",
                borderRadius: 2,
                boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
                maxWidth: { md: 736 },
                width: "100%",
              }}
            >
              <Box flex={3 / 8}>
                <Image src={item.image} width={"100%"} height={"100%"} />
              </Box>
              <Stack
                flex={5 / 8}
                gap={{ md: 2, xs: 1 }}
                p={{ md: 4, xs: 3 }}
                justifyContent={"center"}
                borderTop={(theme) => ({ md: "unset", xs: `1.5px solid ${theme.palette.dark[3]}` })}
                sx={(theme) => ({
                  ...(isOdd(index)
                    ? { borderLeft: { md: `1.5px solid ${theme.palette.dark[3]}` } }
                    : { borderRight: { md: `1.5px solid ${theme.palette.dark[3]}` } }),
                })}
              >
                <Typography variant={isMobile ? "p1-medium" : "h4-medium"} color="common.white">
                  {item.title}
                </Typography>
                <Typography variant="p2-regular" color="grey.light">
                  {item.text}
                </Typography>
              </Stack>
            </Stack>
            {!isMobile &&
              (isOdd(index) ? (
                <BlueBar />
              ) : (
                <Typography
                  mr={"4%"}
                  ml={8}
                  fontSize={88}
                  fontWeight={600}
                  lineHeight={1.5}
                  color="rgba(255, 255, 255, 0.03)"
                >
                  {`0${index + 1}`}
                </Typography>
              ))}
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

export default How;
