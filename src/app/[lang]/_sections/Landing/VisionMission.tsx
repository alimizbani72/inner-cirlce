import type { FC } from "react";
import LandingContainer from "./LandingContainer";
import { Stack, Typography } from "@mui/material";
import SectionTitle from "./SectionTitle";
import { useIsMobile } from "@/hooks/use-responsive";

interface VisionMissionProps {}

const Circle: FC<{ title: string; blueBorder?: boolean }> = ({ title, blueBorder }) => (
  <Stack
    width={{ md: 395, xs: 310 }}
    height={{ md: 395, xs: 310 }}
    borderRadius={{ md: 395, xs: 310 }}
    bgcolor={blueBorder ? "dark.2" : undefined}
    border="1px solid"
    alignItems={"center"}
    justifyContent={"center"}
    borderColor={blueBorder ? "blue.dark" : "dark.3"}
  >
    <Typography textAlign="center" variant="h4-regular" color="white" width="80%">
      {title}
    </Typography>
  </Stack>
);

const VisionMission: FC<VisionMissionProps> = () => {
  const isMobile = useIsMobile();
  return (
    <LandingContainer gap={6} my={{ md: 20, xs: 14 }} alignItems={"center"} position={"relative"} overflow={"hidden"}>
      <SectionTitle
        title={`Our <span style="color: #565CE4">V</span>ision`}
        bigTypoColor="rgba(255, 255, 255, 0.02)"
        color="white"
        firsLetterColor="white"
      />
      <Typography
        textAlign="center"
        variant={isMobile ? "h4-regular" : "h3-regular"}
        color="white"
        maxWidth={736}
        width={"100%"}
      >
        The secret to getting into the 5% who will make life changing money during this cycle is to have access to the
        right information at the right time.
      </Typography>

      <svg width="9" height="200" viewBox="0 0 9 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.5" width="2" height="200" rx="1" fill="#14162E" />
        <circle cx="4.5" cy="100" r="4" fill="url(#paint0_radial_4158_26383)" />
        <defs>
          <radialGradient
            id="paint0_radial_4158_26383"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.5 100) rotate(90) scale(4)"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#CDDFF2" />
          </radialGradient>
        </defs>
      </svg>

      <SectionTitle
        title={`Our <span style="color: #FF409D">M</span>ission`}
        bigTypoColor="rgba(255, 255, 255, 0.02)"
        color="white"
        firsLetterColor="white"
      />
      <Typography
        textAlign="center"
        variant={isMobile ? "h4-regular" : "h3-regular"}
        color="white"
        maxWidth={736}
        width={"100%"}
      >
        to simplify and enhance the cryptocurrency investment experience for users of all levels.
      </Typography>

      <Stack
        direction={{ md: "row" }}
        sx={{ "> div:nth-child(2)": { mx: { md: -4 }, my: { md: "unset", xs: -4 }, zIndex: 2 } }}
      >
        <Circle title="How Chainmind has positively impacted their crypto investments." />
        <Circle blueBorder title="How Chainmind has positively impacted their crypto investments." />
        <Circle title="How Chainmind has positively impacted their crypto investments." />
      </Stack>
    </LandingContainer>
  );
};

export default VisionMission;
