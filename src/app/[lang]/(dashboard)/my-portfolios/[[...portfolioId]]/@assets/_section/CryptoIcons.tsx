import Image from "@/components/Image";
import { Stack, Typography } from "@mui/material";

type CryptoIconProps = {
  name: string;
  symbol: string;
  logoUrl: string;
};
const CryptoIcon = ({ name, symbol, logoUrl }: CryptoIconProps) => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Image src={logoUrl} width={24} height={24} />
      <Typography variant="p2-medium" sx={{ whiteSpace: "pre" }}>
        {name}
      </Typography>
      <Typography variant="p2-medium" sx={{ color: "grey.light" }}>
        {symbol}
      </Typography>
    </Stack>
  );
};

export default CryptoIcon;
