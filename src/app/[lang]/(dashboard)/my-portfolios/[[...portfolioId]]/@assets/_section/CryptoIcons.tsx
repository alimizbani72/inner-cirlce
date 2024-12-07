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
      <Stack>
        <Image src={logoUrl} width={24} height={24} />
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "start", md: "center" }}
        spacing={{ xs: 0, md: 1 }}
      >
        <Typography
          variant="p2-medium"
          sx={{
            wordBreak: { xs: "break-all", md: "normal" },
          }}
          whiteSpace={{ xs: "none", md: "wrap" }}
        >
          {name}
        </Typography>
        <Typography variant="p2-medium" sx={{ color: "grey.light" }}>
          {symbol}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CryptoIcon;
