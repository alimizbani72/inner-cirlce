"use client";

import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useIsMobile } from "@/hooks/use-responsive";
import { snipText } from "@/utils/string";
import { Icon } from "@/components/icons";
import ContentStack from "@app/_components/ContentStack";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import dynamic from "next/dynamic";
import { useAffiliateServiceAffiliateReferralCodeQuery } from "@minecraft/queries";
import { referralLink } from "@/consts";
import { useTranslate } from "@/locales";

const QRCodeWithIcon = dynamic(() => import("@/components/QRCodeWithIcon"), {
  ssr: false,
  loading: () => <Box sx={{ width: 140, height: 140 }} />,
});

const AffiliateHeader: FC = () => {
  const { data } = useAffiliateServiceAffiliateReferralCodeQuery();
  const { copy } = useCopyToClipboard();
  const isMobile = useIsMobile();
  const { t } = useTranslate();

  const handleCopy = () => {
    copy(referralLink(data?.data!));
  };

  return (
    <Stack p={{ md: 4, xs: 3 }} sx={{ pt: "0 !important" }}>
      <ContentStack p={0} direction={{ md: "row" }}>
        <Stack p={3} gap={3} flex={1}>
          <Stack gap={0.5}>
            <Typography variant="h4-semi-bold">{t("affiliateHeader.yourReferralLink")}</Typography>
            <Typography variant="p2-regular" color="grey.light">
              {t("affiliateHeader.shareWithAudience")}
            </Typography>
          </Stack>
          <Stack
            sx={{ height: 56, borderRadius: "28px", backgroundColor: "dark.3", p: 1, pl: 2 }}
            direction={"row"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography
              variant="p2-medium"
              color="blue.light"
              pr={2}
              sx={{ textOverflow: "ellipsis", wordBreak: "break-all", ...snipText(1) }}
            >
              {referralLink(data?.data!)}
            </Typography>

            {isMobile ? (
              <IconButton onClick={handleCopy} color="primary">
                <Icon name="Copy" />
              </IconButton>
            ) : (
              <Button sx={{ whiteSpace: "nowrap" }} onClick={handleCopy} startIcon={<Icon name="Copy" />}>
                {t("affiliateHeader.copyCode")}
              </Button>
            )}
          </Stack>
        </Stack>

        <Divider flexItem sx={{ borderWidth: "1px" }} />

        <Stack p={3} gap={3} direction={{ md: "row" }} alignItems={"center"} justifyContent={"space-between"}>
          <QRCodeWithIcon value={referralLink(data?.data!)} iconSrc="/logo/logo.svg" size={isMobile ? 200 : 140} />
          <Icon name="Share" />
        </Stack>
      </ContentStack>
    </Stack>
  );
};

export default AffiliateHeader;
