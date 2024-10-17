import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import { Box, Stack, Typography } from "@mui/material";
type Props = {
  onClick?: VoidFunction;
  icon: iconsType;
  value: string;
};
const CustomBadge = ({ onClick, icon, value }: Props) => {
  return (
    <Stack
      onClick={onClick}
      direction={"row"}
      alignItems={"center"}
      sx={{ bgcolor: "dark.3", borderRadius: 2.5, px: 2, py: 1, cursor: "pointer" }}
      spacing={1}
    >
      <Box sx={{ path: { stroke: (theme) => theme.palette.grey.light } }}>
        <Icon name={icon} />
      </Box>

      <Typography variant="p2-medium" sx={{ whiteSpace: "nowrap" }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default CustomBadge;
