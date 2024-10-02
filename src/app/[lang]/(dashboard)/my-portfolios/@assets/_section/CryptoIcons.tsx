import { Box, Typography } from "@mui/material";

const cryptoIcons = {
  Bitcoin: "/assets/svg/btc.svg",
  Ethereum: "/assets/svg/eth.svg",
  BNB: "/assets/svg/bnb.svg",
  VeChain: "/assets/svg/vet.svg",
};
type CryptoIconProps = {
  name: string;
  ticker: string;
};
const CryptoIcon = ({ name, ticker }: CryptoIconProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <img src={cryptoIcons[name as keyof typeof cryptoIcons]} width={24} height={24} />
      <Typography variant="p2-medium">{name}</Typography>
      <Typography variant="p2-medium" sx={{ color: "grey.light" }}>
        {ticker}
      </Typography>
    </Box>
  );
};

export default CryptoIcon;
