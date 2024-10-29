import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";

type ActionItemProps = {
  iconName: iconsType;
  label: string;
  onClick?: () => void;
};

const ActionItem = ({ iconName, label, onClick }: ActionItemProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      width={"100%"}
      spacing={1}
      onClick={onClick}
      sx={{ cursor: "pointer" }}
    >
      <Box sx={{ path: { stroke: (theme) => theme.palette.grey.light } }}>
        <Icon name={iconName} />
      </Box>
      <Typography variant="p2-medium">{label}</Typography>
    </Stack>
  );
};

export default ActionItem;
