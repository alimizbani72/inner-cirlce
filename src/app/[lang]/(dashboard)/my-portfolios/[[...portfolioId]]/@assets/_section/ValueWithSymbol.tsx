import { Stack, Typography } from "@mui/material";
type Props = {
  value: string | number;
  symbol: string;
};
const ValueWithSymbol = ({ symbol, value }: Props) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <Typography variant="p2-regular">{value}</Typography>
      <Typography variant="p2-regular">{symbol}</Typography>
    </Stack>
  );
};

export default ValueWithSymbol;
