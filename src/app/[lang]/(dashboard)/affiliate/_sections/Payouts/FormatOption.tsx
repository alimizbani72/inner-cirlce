import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import { Box, Stack, Typography } from "@mui/material";

type FormatOptionProps = {
  iconName: iconsType;
  label: string;
  isSelected: boolean;
  onClick?: () => void;
};

const FormatOption = ({ iconName, label, isSelected, onClick }: FormatOptionProps) => {
  return (
    <Stack
      direction={"row"}
      onClick={onClick}
      sx={{
        justifyContent: "space-between",
        border: "1px solid",
        borderColor: "dark.3",
        borderRadius: 2,
        width: "100%",
        p: 2,
        cursor: "pointer",
      }}
    >
      <Stack direction={"row"} spacing={1}>
        <Icon name={iconName} />
        <Typography>{label}</Typography>
      </Stack>

      <Box
        width={"24px"}
        height={"24px"}
        borderRadius={"50%"}
        sx={{
          bgcolor: isSelected ? "pink.dark" : "transparent",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          border: isSelected ? "none" : "1px solid",
          borderColor: "dark.3",
        }}
      >
        {isSelected && <Box width={"8px"} height={"8px"} borderRadius={"50%"} sx={{ bgcolor: "dark.1" }}></Box>}
      </Box>
    </Stack>
  );
};

export default FormatOption;
