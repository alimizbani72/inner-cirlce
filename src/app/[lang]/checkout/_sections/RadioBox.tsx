import { Icon } from "@/components/icons";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

type Props = { checked: boolean; icon: any; label: string; onClick: VoidFunction };

const RadioBox: FC<Props> = ({ checked, icon, label, onClick }) => {
  return (
    <Stack
      direction={"row"}
      sx={{
        cursor: checked ? "default" : "pointer",
        bgcolor: checked ? "dark.3" : "dark.2",
        border: "1.5px solid",
        borderColor: "dark.3",
      }}
      onClick={onClick}
      gap={1}
      p={2}
      borderRadius={1.5}
    >
      <Icon name={icon} />
      <Typography mr={"auto"} variant="p2-medium">
        {label}
      </Typography>

      {checked ? (
        <Box
          sx={{
            position: "relative",
            borderRadius: 1.5,
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.16)",
            background: "radial-gradient(50% 50% at 50% 50%, #FF7DBC 0%, #FF409D 100%)",
            border: "1px solid",
            borderColor: "dark.3",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              borderRadius: 1.5,
              backgroundColor: "dark.1",
              width: 8,
              height: 8,
              zIndex: 1,
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            borderRadius: 1.5,
            background: "dark.1",
            border: "1px solid",
            borderColor: "dark.3",
            width: 24,
            height: 24,
          }}
        />
      )}
    </Stack>
  );
};

export default RadioBox;
