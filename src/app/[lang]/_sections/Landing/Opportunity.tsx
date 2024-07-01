import { Box, Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import LandingContainer from "./LandingContainer";
import SectionTitle from "./SectionTitle";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import Image from "@/components/Image";
import type { media } from "@cms/requests";
import { CMSDownloadURL } from "@/consts";

interface OpportunityProps {
  blockTitle: string;
  cards: Array<{
    image: media;
    title: string;
    description: string;
    id?: string | null;
  }>;
  buttonText: string;
  buttonLink: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "Opportunity";
}

const Opportunity: FC<OpportunityProps> = ({ buttonLink, blockTitle, buttonText, cards }) => {
  const isMobile = useIsMobile();

  return (
    <Stack
      width={{ md: "calc(100% - 32px)", xs: "calc(100% - 16px)" }}
      mx={{ md: 2, xs: 1 }}
      sx={{ background: "linear-gradient(180deg, #CDDFF2 0%, #F6FAFF 100%)", borderRadius: { md: 4, xs: 3 } }}
      py={{ md: 12, xs: 8 }}
      alignItems={"center"}
      overflow={"hidden"}
    >
      <LandingContainer gap={{ md: 6, xs: 4 }} px={{ md: 3, xs: 2 }} alignItems={"center"}>
        <SectionTitle title={blockTitle} color="dark.1" firsLetterColor="pink.dark" />

        <Stack gap={{ md: 4, xs: 3 }} direction={{ md: "row" }}>
          {cards.map((item) => (
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
                <Image src={CMSDownloadURL(item?.image?.url!)} sx={{ aspectRatio: "1/1" }} width={"100%"} />
              </Box>
              <Stack gap={1.5} py={4} px={3}>
                <Typography variant="h4-semi-bold" color="dark.1">
                  {item.title}
                </Typography>
                <Typography variant="p2-medium" color="dark.1">
                  {item.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Button href={buttonLink} fullWidth={isMobile} size="large" endIcon={<Icon name="Arrow-right" />}>
          {buttonText}
        </Button>
      </LandingContainer>
    </Stack>
  );
};

export default Opportunity;
