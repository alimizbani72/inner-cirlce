import Image from "@/components/Image";
import { Box, Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface PaymentReceiptProps {}

const PaymentReceipt: FC<PaymentReceiptProps> = () => {
  return (
    <Stack>
      <Typography mb={{ md: 4, xs: 3 }} variant="p2-medium">
        Subscribe to “Shark” plan.
      </Typography>

      <Stack alignItems={"center"} direction={{ md: "column", xs: "row" }} gap={{ md: 0, xs: 2 }} mb={{ md: 4, xs: 3 }}>
        <Box width={{ md: 248, xs: 96 }} height={{ md: 248, xs: 96 }}>
          <Image src="/assets/shark.svg" width="100%" height="100%" />
        </Box>

        <Stack flex={1} gap={{ md: 1 }} alignItems={{ md: "center" }}>
          <Typography variant="p1-semi-bold">Shark</Typography>
          <Typography variant="p2-medium" color={"rgba(255, 255, 255, 0.64)"}>
            Dive deep. Apex predator insights to rule the crypto sea. 
          </Typography>
        </Stack>
      </Stack>

      <Stack gap={2}>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="p2-medium" textTransform={"uppercase"}>
            Sub total
          </Typography>
          <Typography variant="p1-semi-bold">$5,000.00</Typography>
        </Stack>
        <Divider flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="p2-medium" textTransform={"uppercase"}>
            Duties & taxes
          </Typography>
          <Typography variant="p1-semi-bold">$40</Typography>
        </Stack>
        <Divider flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="p2-medium" textTransform={"uppercase"}>
            Total payment
          </Typography>
          <Typography variant="p1-semi-bold" fontSize={20}>
            $5,040.00
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PaymentReceipt;
