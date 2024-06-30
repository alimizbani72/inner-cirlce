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
        " h2": { mt: "10px !important", mb: 3 },
        " h3": { mt: "10px !important", mb: 3 },
        " h4": { mt: "10px !important", mb: 3 },
        " h5": { mt: "10px !important", mb: 3 },
        " h6": { mt: "10px !important", mb: 3 },
        " p": { typography: "regular-h4", lineHeight: "24px !important" },
        " image": { maxWidth: "100%" },
      }}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
    />
  );
};

export default ContentParser;
