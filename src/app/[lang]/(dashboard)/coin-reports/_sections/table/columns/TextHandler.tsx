import { Typography } from "@mui/material";

interface TextHandlerProps {
  value: string;
  length: number;
  suffix?: string;
  prefix?: string;
  slug?: string;
}

const TextHandler = ({ length, value, slug, prefix = "", suffix = "" }: TextHandlerProps) => (
  <Typography variant="p2-medium">
    {slug ? `${prefix}${value?.toString()?.slice(0, length)}${suffix}` : "••••••••"}
  </Typography>
);

export default TextHandler;
