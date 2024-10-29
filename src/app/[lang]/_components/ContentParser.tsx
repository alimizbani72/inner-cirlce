import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import type { FC } from "react";

type Props = {
  content: string;
};

const ContentParser: FC<Props> = ({ content }: Props) => {
  return (
    <Box
      component="div"
      my="32px"
      sx={{
        color: "white",
        " h1": { mb: 1 },
        " h2": { mt: "10px !important", mb: 1 },
        " h3": { mt: "10px !important", mb: 1 },
        " h4": { mt: "10px !important", mb: 1 },
        " h5": { mt: "10px !important", mb: 1 },
        " h6": { mt: "10px !important", mb: 1 },
        " p": { typography: "p2-regular", lineHeight: "24px !important", color: "#BBBDD0" },
        " li": { typography: "p2-regular", lineHeight: "24px !important", color: "#BBBDD0" },
        " strong": { typography: "p2-bold", lineHeight: "24px !important" },
        " u": { color: "blue.light" },
        " a": { typography: "regular-h4", color: "blue.light" },
        " image": { maxWidth: "100%" },
      }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};

export default ContentParser;
