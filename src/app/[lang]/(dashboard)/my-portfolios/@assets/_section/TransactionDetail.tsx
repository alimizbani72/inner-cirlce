import { Stack, Typography } from "@mui/material";

const TransactionDetail = ({ label, value }: { label: string; value: string }) => (
  <Stack direction={"row"} spacing={0.5}>
    <Typography variant="caption-medium" color={"grey.light"} textTransform={"uppercase"}>
      {label}
    </Typography>
    <Typography variant="caption-medium">{value}</Typography>
  </Stack>
);

export default TransactionDetail;
