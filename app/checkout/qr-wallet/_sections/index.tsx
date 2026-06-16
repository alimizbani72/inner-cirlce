"use client";

import Icon from "@/components/icon";
import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { FC } from "react";

import RiveComp from "@/components/rive-loader";
import { plans } from "@/configs/plans";
import ContentStack from "@app-components/ContentStack";
import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";
import PayoutTimer from "./PayoutTimer";
import QrCodeModal from "./QrCodeModal";

type Props = { planType: string; id: string };

const QRCodeWithIcon = dynamic(() => import("@/components/QRCodeWithIcon"), {
  ssr: false,
  loading: () => <Box sx={{ width: 140, height: 140 }} />,
});

const CheckoutQRWalletSection: FC<Props> = ({ planType }) => {
  // ===== Dummy replacements for hooks =====
  const t = (key: string) => key;
  const isMobile = false;
  const router = useRouter();
  const open = false;
  const toggle = () => {};

  const copy = (v: string) => console.log("copy:", v);

  const isLoading = false;

  const data = {
    data: {
      address: "0xDEMO_WALLET_ADDRESS_123456789",
      duration: 120,
      total_amount: {
        amount: 49.99,
        currency_code: "USDT",
      },
      paid_amount: 10.0,
      status: "pending",
    },
  };

  const walletAddress = `${data?.data?.address}`;

  const handleCopy = () => {
    copy(walletAddress);
  };

  return (
    <Stack
      direction={{ md: "row" }}
      flex={1}
      minHeight="100vh"
      position="relative"
    >
      {/* Plan */}
      <Stack
        sx={{
          position: "relative",
          display: { xs: "none", md: "flex" },
          background: (theme) => theme.palette.gradient.blue,
          flex: { md: 1 },
          pt: { md: 8, xs: 3 },
          pb: { md: 8, xs: 5 },
        }}
        alignItems="center"
        overflow="hidden"
      >
        <Typography
          sx={{ top: "50%", transform: "translateY(-50%)" }}
          position="absolute"
          fontSize="88px"
          fontWeight={600}
          lineHeight="120px"
          whiteSpace="nowrap"
          zIndex={1}
          textTransform="uppercase"
          color="rgba(255, 255, 255, 0.08)"
        >
          • {planType} • {planType} •
        </Typography>

        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <img
            src="/assets/svg/checkout-texture.svg"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box sx={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <img
            src="/assets/svg/checkout-flares.svg"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Stack
          position="relative"
          zIndex={2}
          gap={1}
          direction="row"
          alignItems="center"
          width="100%"
          maxWidth={{ md: "486px" }}
          px={3}
          sx={{ cursor: "pointer" }}
          onClick={() => router.push("/checkout")}
        >
          <Icon name="ArrowLeftIcon" />
          <Typography variant="h4-semi-bold">{t("checkout.title")}</Typography>
        </Stack>

        <Divider
          flexItem
          sx={{
            mt: 3,
            mb: { md: 4, xs: 3 },
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        />

        <Stack
          position="relative"
          zIndex={2}
          width="100%"
          maxWidth={{ md: "486px" }}
          px={3}
          flex={1}
        >
          <Typography variant="p2-medium">
            {`${t("checkout.subscribeTo")} “${planType}” ${t("checkout.plan")}.`}
          </Typography>

          <Stack flex={1} alignItems="center" justifyContent="center">
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

          <Stack
            display={{ xs: "none", md: "flex" }}
            direction={"row"}
            spacing={3}
          >
            <Typography variant="caption-semi-bold">
              {t("checkout.PoweredByChainMind")}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                border: "1.5px solid rgba(255, 255, 255, 0.08)",
                height: "16px",
              }}
            />
            <Typography variant="caption-medium">
              {t("checkout.legal")}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* Form */}
      <Stack
        sx={{ bgcolor: "dark.1", flex: 1, py: { md: 8, xs: 3 } }}
        alignItems="center"
      >
        <Stack
          position="relative"
          zIndex={2}
          direction="row"
          alignItems="center"
          width="100%"
          maxWidth={{ md: "434px" }}
          px={3}
        >
          <Typography variant="h4-semi-bold">{t("checkout.payQr")}</Typography>
        </Stack>

        <Divider
          flexItem
          sx={{ mt: 3, borderColor: "rgba(255, 255, 255, 0.08)" }}
        />

        <Stack
          position="relative"
          zIndex={2}
          width="100%"
          maxWidth={{ md: "434px" }}
          alignItems="center"
          px={3}
          mt={3}
          flex={1}
        >
          {!isMobile ? (
            <QRCodeWithIcon
              value={walletAddress}
              iconSrc={`/assets/currencies/${data?.data?.total_amount?.currency_code}.svg`}
              size={isMobile ? 200 : 140}
            />
          ) : (
            <Button
              startIcon={<Icon name="QrCodeIcon" />}
              sx={{ width: "100%" }}
              color="tertiary"
            >
              {t("checkout.scanQrCode")}
            </Button>
          )}

          {open && (
            <QrCodeModal
              open={open}
              close={toggle}
              currencyCode={data?.data?.total_amount?.currency_code}
              walletAddress={walletAddress}
            />
          )}

          <Typography variant="h4-semi-bold" mt={2}>
            {data?.data?.total_amount?.currency_code} -{" "}
            <Typography variant="h4-semi-bold" color={"warning.main"}>
              {t("checkout.polygonNetwork")}
            </Typography>
          </Typography>

          {isLoading ? (
            <ContentStack
              mb={3}
              className="loading-skeleton"
              height={"82px"}
              width={"100%"}
              mt={3}
            />
          ) : (
            <ContentStack
              direction="row"
              gap={2}
              mt={{ md: 4, xs: 3 }}
              mb={3}
              p={2}
              alignItems={"center"}
            >
              <Stack gap={2} direction={"row"} alignItems={"center"}>
                <Stack
                  width={48}
                  height={48}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={3}
                  bgcolor={"dark.3"}
                >
                  <Icon name="WalletIcon" size={20} />
                </Stack>

                <Typography
                  flex={1}
                  variant="p2-regular"
                  sx={{ wordBreak: "break-word" }}
                >
                  {walletAddress}
                </Typography>
              </Stack>

              <IconButton onClick={handleCopy} color="primary">
                <Icon name="CopyIcon" />
              </IconButton>
            </ContentStack>
          )}

          <Stack width={"100%"}>
            <Box
              sx={{
                border: "1.5px solid",
                borderRadius: 1.5,
                borderColor: "dark.3",
                bgcolor: "dark.2",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PayoutTimer
                duration={data?.data?.duration}
                isLoading={isLoading}
              />

              <Divider orientation="vertical" flexItem />

              <Box sx={{ flex: 2 }}>
                <Stack spacing={2} py={2}>
                  <Stack pl={2}>
                    <Typography
                      variant="caption-medium"
                      color="grey.light"
                      textTransform={"uppercase"}
                    >
                      {t("checkout.amountToSend")}
                    </Typography>
                    <Stack direction={"row"} gap={1}>
                      <Typography variant="h4-semi-bold">
                        {data?.data?.total_amount?.amount}
                      </Typography>
                      <Typography variant="h4-semi-bold">
                        {data?.data?.total_amount?.currency_code}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider />

                  <Stack pl={2}>
                    <Typography
                      variant="caption-medium"
                      color="grey.light"
                      textTransform={"uppercase"}
                    >
                      {t("checkout.paidAmount")}
                    </Typography>
                    <Stack direction={"row"} gap={1}>
                      <Typography variant="h4-semi-bold">
                        {data?.data?.paid_amount}
                      </Typography>
                      <Typography variant="h4-semi-bold">
                        {data?.data?.total_amount?.currency_code}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider />

                  <Stack pl={2}>
                    <Typography
                      variant="caption-medium"
                      color="grey.light"
                      textTransform={"uppercase"}
                    >
                      {t("checkout.subscribeTo")}
                    </Typography>
                    <Typography
                      variant="h4-semi-bold"
                      textTransform={"capitalize"}
                    >
                      {planType}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CheckoutQRWalletSection;
