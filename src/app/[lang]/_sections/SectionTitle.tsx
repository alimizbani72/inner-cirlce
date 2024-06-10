import { Stack, Typography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import type { FC } from "react";

interface SectionTitleProps {
  title: string;
  color: TypographyProps["color"];
  firsLetterColor: TypographyProps["color"];
}

const SectionTitle: FC<SectionTitleProps> = ({ title, color, firsLetterColor }) => {
  return (
    <Stack position={"relative"} alignItems={"center"} justifyContent={"center"}>
      <Typography
        fontSize={88}
        fontWeight={600}
        lineHeight={1.36}
        color={"rgba(7, 7, 32, 0.03)"}
        textTransform="uppercase"
      >
        {title}
      </Typography>
      <Typography
        position={"absolute"}
        variant="h2-semi-bold"
        color={color}
        sx={{ "&:first-letter": { color: firsLetterColor } }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default SectionTitle;
