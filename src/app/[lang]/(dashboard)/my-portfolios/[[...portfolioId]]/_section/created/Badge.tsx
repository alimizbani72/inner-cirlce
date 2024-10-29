import { Stack, Typography } from "@mui/material";
import numeral from "numeral";
type Props = {
  value: string;
  label: string;
  customColor?: string;
};
const Badge = ({ label, value, customColor }: Props) => {
  const numericValue = parseFloat(value as string);
  const color = numericValue === 0 ? "white" : numericValue < 0 ? "error.main" : "success.main";
  return (
    <Stack
      sx={{ bgcolor: "dark.3", borderRadius: 2.5, px: 2, py: 1, width: "auto" }}
      direction={"row"}
      justifyContent={{ xs: "space-between", md: undefined }}
      spacing={1}
    >
      <Typography variant="p2-medium" color={"grey.light"} textTransform={"uppercase"} whiteSpace={"nowrap"}>
        {label}
      </Typography>
      <Typography variant="p2-medium" color={customColor ? customColor : color}>
        ${numeral(value).format("0,0.00")}
      </Typography>
    </Stack>
  );
};

export default Badge;
