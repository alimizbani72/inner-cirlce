"use client";

import Image from "@/components/Image";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { toNumber } from "@/utils/toNumber";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";

const CheckoutQRWalletSection: FC = () => {
  const { t } = useTranslate();
  const searchParams = useSearchParams();
  const isSuccess = toNumber(searchParams.get("success"));

  return (
    <Stack flex={1} height="100vh" position="relative" bgcolor="dark.1" overflow="hidden" p={3}>
      <Box sx={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.16 }}>
        <img src="/assets/svg/checkout-texture.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box sx={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.16 }}>
        <img src="/assets/svg/checkout-flares.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          width: 1261,
          height: 609,
        }}
      >
        <img src="/assets/svg/payment-stars.svg" width="100%" height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          background: isSuccess ? "rgba(0, 177, 113, 0.24)" : "rgba(255, 87, 87, 0.16)",
          width: 400,
          height: 400,
          borderRadius: "400px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "-200px",
          filter: "blur(200px)",
          zIndex: 4,
        }}
      />

      <Typography
        sx={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        position="absolute"
        fontSize="88px"
        fontWeight={600}
        lineHeight="120px"
        whiteSpace="nowrap"
        zIndex={5}
        textTransform="uppercase"
        color={"rgba(255, 255, 255, 0.02)"}
      >
        {isSuccess ? t("payment.successTexture") : t("payment.failTexture")}
      </Typography>

      <Stack
        sx={{
          margin: "auto",
          position: "relative",
          width: "100%",
          maxWidth: 424,
          minHeight: 432,
          borderRadius: 3,
          bgcolor: "dark.2",
          border: "1px solid",
          borderColor: "dark.3",
          boxShadow: "0px 40px 80px 0px rgba(7, 7, 32, 0.40)",
          zIndex: 5,
          p: { md: 4, xs: 3 },
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Image src={`/assets/svg/${isSuccess ? "success" : "failed"}-payment.svg`} width={144} height={144} />

        <Stack gap={1}>
          <Typography textAlign="center" variant="h3-semi-bold">
            {isSuccess ? t("payment.successTitle") : t("payment.failTitle")}
          </Typography>
          <Typography textAlign="center" variant="p2-regular">
            {isSuccess ? t("payment.successSubtitle") : t("payment.failSubtitle")}
          </Typography>
        </Stack>

        <Button color="info" startIcon={<Icon name="Home" />} href="/dashboard">
          {t("button.backHome")}
        </Button>
      </Stack>

      <Box
        sx={{
          background: isSuccess ? "rgba(0, 177, 113, 0.24)" : "rgba(255, 87, 87, 0.16)",
          width: 400,
          height: 400,
          borderRadius: "400px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "-200px",
          filter: "blur(200px)",
        }}
      />
    </Stack>
  );
};

export default CheckoutQRWalletSection;
