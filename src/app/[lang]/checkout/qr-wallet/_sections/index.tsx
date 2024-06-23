"use client";

import { Icon } from "@/components/icons";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { useCallback, useMemo, type FC } from "react";
import { Box } from "@mui/system";

import dynamic from "next/dynamic";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-responsive";
import ContentStack from "@app/_components/ContentStack";
import { useTimer } from "react-timer-hook";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { plans } from "@/configs/plans";
import RiveComp from "@/components/RiveComp";
import { toPascalCase } from "@/utils/change-case";
import { useFinancialServiceFinancialPaymentsIdStatusQuery } from "@minecraft/queries";
import { useAppRouter } from "@/routes/hooks";

type Props = { planType: string; id: string };

const QRCodeWithIcon = dynamic(() => import("@/components/QRCodeWithIcon"), {
  ssr: false,
  loading: () => <Box sx={{ width: 140, height: 140 }} />,
});

const CheckoutQRWalletSection: FC<Props> = ({ planType, id }) => {
  const isMobile = useIsMobile();
  const { copy } = useCopyToClipboard();
  const { push, back } = useAppRouter();
  const { data } = useFinancialServiceFinancialPaymentsIdStatusQuery({ id }, undefined, {
    refetchInterval: (response) => {
      if (response?.state?.data?.data?.status === "completed") {
        push("/payment?success=1");
        return false;
      }

      if (["expired", "failed"].includes(response?.state?.data?.data?.status as string)) {
        push("/payment?success=0");
        return false;
      }

      return 3000;
    },
  });

  const getTimer = useCallback(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + toNumber(data?.data?.duration));
    return time;
  }, [data?.data]);

  const { minutes, seconds } = useTimer({ expiryTimestamp: getTimer() });

  const walletAddress = useMemo(() => `${data?.data?.address}`, [data?.data]);

  const handleCopy = () => {
    copy(walletAddress);
  };

  return (
    <Stack direction={{ md: "row" }} flex={1} minHeight={"100%"} position={"relative"}>
      {/* Plan */}
      <Stack
        sx={{
          position: "relative",
          background: (theme) => theme.palette.gradient.blue,
          flex: { md: 1 },
          pt: { md: 8, xs: 3 },
          pb: { md: 8, xs: 5 },
        }}
        alignItems={"center"}
        overflow={"hidden"}
      >
        <Typography
          sx={{ top: "50%", transform: "translateY(-50%)" }}
          position={"absolute"}
          fontSize={"88px"}
          fontWeight={600}
          lineHeight={"120px"}
          whiteSpace={"nowrap"}
          zIndex={1}
          textTransform={"uppercase"}
          color={"rgba(255, 255, 255, 0.08)"}
        >
          • {planType} • {planType} •
        </Typography>
        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <img src="/assets/svg/checkout-texture.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
        </Box>

        <Box sx={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <img src="/assets/svg/checkout-flares.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
        </Box>
        <Stack
          position={"relative"}
          zIndex={2}
          gap={1}
          direction="row"
          alignItems="center"
          width="100%"
          maxWidth={{ md: "486px" }}
          px={3}
          sx={{ cursor: "pointer" }}
          onClick={() => back()}
        >
          <Icon name="Arrow-left" />
          <Typography variant="h4-semi-bold">Checkout</Typography>
        </Stack>
        <Divider flexItem sx={{ mt: 3, mb: { md: 4, xs: 3 }, borderColor: "rgba(255, 255, 255, 0.08)" }} />
        <Stack position={"relative"} zIndex={2} width="100%" maxWidth={{ md: "486px" }} px={3} flex={1}>
          <Typography variant="p2-medium">Subscribe to “{toPascalCase(planType)}” plan.</Typography>

          <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
            {plans[planType as keyof typeof plans]?.rive && (
              <Box
                width={{ md: 248, xs: 144 }}
                height={{ md: 248, xs: 144 }}
                sx={{ aspectRatio: 1 }}
                mb={10}
                mt={{ md: 0, xs: 3 }}
              >
                <RiveComp
                  src={plans[planType as keyof typeof plans]?.rive}
                  width={isMobile ? 144 : 248}
                  height={isMobile ? 144 : 248}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
      {/* Form */}
      <Stack sx={{ bgcolor: "dark.1", flex: 1, py: { md: 8, xs: 3 } }} alignItems={"center"}>
        <Stack
          position={"relative"}
          zIndex={2}
          direction="row"
          alignItems="center"
          width="100%"
          maxWidth={{ md: "434px" }}
          px={3}
        >
          <Typography variant="h4-semi-bold">Pay with QR Code or Wallet Address</Typography>
        </Stack>
        <Divider flexItem sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.08)" }} />
        <Stack
          position={"relative"}
          zIndex={2}
          width="100%"
          maxWidth={{ md: "434px" }}
          alignItems="center"
          px={3}
          flex={1}
        >
          <QRCodeWithIcon value={walletAddress} iconSrc="/assets/svg/usdc-polygon.svg" size={isMobile ? 200 : 140} />

          <Typography variant="h4-semi-bold" mt={2}>
            USDT -{" "}
            <Typography variant="h4-semi-bold" color={"warning.main"}>
              Polygon Network
            </Typography>
          </Typography>

          <ContentStack direction="row" gap={2} mt={{ md: 4, xs: 3 }} mb={4} p={2} alignItems={"center"}>
            <Stack gap={2} direction={"row"} alignItems={"center"}>
              <Stack
                width={48}
                height={48}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={3}
                bgcolor={"dark.3"}
              >
                <Icon name="Wallet" size={20} />
              </Stack>
              <Typography flex={1} variant="p2-regular" sx={{ wordBreak: "break-word" }}>
                {walletAddress}
              </Typography>
            </Stack>

            <IconButton onClick={handleCopy} color="primary">
              <Icon name="Copy" />
            </IconButton>
          </ContentStack>

          <Stack mt="auto" gap={2} width={"100%"}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="p2-medium" color="grey.light" textTransform={"uppercase"}>
                Expire at
              </Typography>
              <Stack direction="row" gap={1}>
                <Icon name="Time" />
                <Typography variant="p1-medium">{`${minutes?.toString()?.padStart(2, "0")}:${seconds
                  ?.toString()
                  ?.padStart(2, "0")}`}</Typography>
              </Stack>
            </Stack>
            <Divider flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="p2-medium" color="grey.light" textTransform={"uppercase"}>
                Amount to send
              </Typography>
              <Typography variant="p1-medium">{formatCurrency(data?.data?.total_amount!)}</Typography>
            </Stack>
            <Divider flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="p2-medium" color="grey.light" textTransform={"uppercase"}>
                Paid Amount
              </Typography>
              <Typography variant="p1-medium">{formatCurrency(data?.data?.paid_amount!)}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckoutQRWalletSection;
