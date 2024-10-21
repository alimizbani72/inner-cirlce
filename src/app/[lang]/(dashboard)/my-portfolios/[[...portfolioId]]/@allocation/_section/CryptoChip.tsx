import { Chip, Stack, Typography } from "@mui/material";
import Bullets from "../../_section/Bullets";

interface CryptoChipProps {
  label: string;
  value: number;
  isActive: boolean;
  onHover: (symbol: string | null) => void;
}

const CryptoChip = ({ label, value, isActive, onHover }: CryptoChipProps) => {
  return (
    <Chip
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="p2-medium" color={isActive ? "white" : "grey.light"}>
            {label}
          </Typography>
          <Typography variant="p2-medium">{Math.floor(value)}%</Typography>
        </Stack>
      }
      variant="outlined"
      icon={<Bullets bgcolor={isActive ? "#F3BA2F" : "dark.1"} />}
      sx={{
        backgroundColor: "dark.3",
        border: 0,
        borderRadius: 2,
        py: 0.5,
        px: { xs: 1, md: 2 },
      }}
      onMouseEnter={() => onHover(label)}
      onMouseLeave={() => onHover(null)}
    />
  );
};

export default CryptoChip;
