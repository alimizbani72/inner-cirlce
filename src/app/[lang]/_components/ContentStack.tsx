import { Stack, type StackProps } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

const ContentStack: FC<StackProps & PropsWithChildren> = ({ children, ...props }) => {
  return (
    <Stack p={3} borderRadius={2} border="1.5px solid" borderColor="dark.3" bgcolor="dark.2" {...props}>
      {children}
    </Stack>
  );
};

export default ContentStack;
