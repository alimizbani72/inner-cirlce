import { useIsMobile } from "@/hooks/use-responsive";
import { Box, Stack, Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import type { FC } from "react";

interface SectionTitleProps {
  title: string;
  color: TypographyProps["color"];
  firsLetterColor: TypographyProps["color"];
  bigTypoColor?: TypographyProps["color"];
}

const SectionTitle: FC<SectionTitleProps> = ({ title, color, firsLetterColor, bigTypoColor }) => {
  const isMobile = useIsMobile();

  return (
    <Stack position={"relative"} alignItems={"center"} justifyContent={"center"}>
      <Box
        component={Typography}
        fontSize={{ md: 88, xs: 64 }}
        fontWeight={600}
        lineHeight={1.36}
        color={bigTypoColor || "rgba(7, 7, 32, 0.03)"}
        textTransform="uppercase"
        whiteSpace="nowrap"
        sx={{ "> *": { color: `${bigTypoColor} !important` } }}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <Box
        component={Typography}
        position={"absolute"}
        variant={isMobile ? "h3-semi-bold" : "h2-semi-bold"}
        color={color}
        sx={{ "&:first-letter": { color: firsLetterColor } }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </Stack>
  );
};

export default SectionTitle;
