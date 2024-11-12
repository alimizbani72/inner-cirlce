import { Chip, Stack, Typography } from "@mui/material";
import Bullets from "../../_section/Bullets";
import { parseToNumber } from "../../_section/utils";

interface CryptoChipProps {
  label: string;
  value: number;
  isActive: boolean;
  onHover: (symbol: string | null) => void;
}

const CryptoChip = ({ label, value, isActive, onHover }: CryptoChipProps) => {
  const parsedValue = parseToNumber(value);
  const displayValue = Math.abs(parsedValue) < 0.01 ? 0 : parsedValue;

  return (
    <Chip
      label={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="p2-medium" color={isActive ? "white" : "grey.light"}>
            {label}
          </Typography>
          <Typography variant="p2-medium">{displayValue.toFixed(2)}%</Typography>
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
