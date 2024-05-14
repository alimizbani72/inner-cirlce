import { Stack, type StackProps } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

interface ContentStackProps {
  sx?: StackProps["sx"];
}

const ContentStack: FC<ContentStackProps & PropsWithChildren> = ({ children, sx }) => {
  return (
    <Stack sx={{ p: 3, borderRadius: 2, border: "1.5px solid", borderColor: "dark.3", bgcolor: "dark.2", ...sx }}>
      {children}
    </Stack>
  );
};

export default ContentStack;
