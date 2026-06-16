"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useIsMobile } from "@/hooks/use-responsive";
import { snipText } from "@/utils/string";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { FC } from "react";

import Icon from "@/components/icon";
import { referralLink } from "@/consts";
import { useTranslate } from "@/locales";
import ContentStack from "@app-components/ContentStack";
import dynamic from "next/dynamic";

const QRCodeWithIcon = dynamic(() => import("@/components/QRCodeWithIcon"), {
  ssr: false,
  loading: () => <Box sx={{ width: 140, height: 140 }} />,
});

const AffiliateHeader: FC = () => {
  const data = {
    data: "AFF-12345-XYZ",
  };
  const { copy } = useCopyToClipboard();
  const isMobile = useIsMobile();
  const { t } = useTranslate();

  const handleCopy = () => {
    copy(referralLink(data?.data!));
  };

  return (
    <Stack p={{ md: 4, xs: 3 }} sx={{ pt: "0 !important" }}>
      <ContentStack
        p={0}
        height={{ md: "193px", xs: "519px" }}
        direction={{ md: "row" }}
        className={!data?.data ? "loading-skeleton" : ""}
      >
        {data?.data && (
          <>
            <Stack p={3} gap={3} flex={1}>
              <Stack gap={0.5}>
                <Typography variant="h4-semi-bold">
                  {t("affiliateHeader.yourReferralLink")}
                </Typography>
                <Typography variant="p2-regular" color="grey.light">
                  {t("affiliateHeader.shareWithAudience")}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  height: 56,
                  borderRadius: "28px",
                  backgroundColor: "dark.3",
                  p: 1,
                  pl: 2,
                }}
                direction={"row"}
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Typography
                  variant="p2-medium"
                  color="blue.light"
                  pr={2}
                  sx={{
                    textOverflow: "ellipsis",
                    wordBreak: "break-all",
                    ...snipText(1),
                  }}
                >
                  {referralLink(data?.data!)}
                </Typography>

                {isMobile ? (
                  <IconButton onClick={handleCopy} color="primary">
                    <Icon name="CopyIcon" />
                  </IconButton>
                ) : (
                  <Button
                    sx={{ whiteSpace: "nowrap" }}
                    onClick={handleCopy}
                    startIcon={<Icon name="CopyIcon" />}
                  >
                    {t("affiliateHeader.copyCode")}
                  </Button>
                )}
              </Stack>
            </Stack>

            <Divider flexItem sx={{ borderWidth: "1px" }} />

            <Stack
              p={3}
              gap={3}
              direction={{ md: "row" }}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <QRCodeWithIcon
                value={referralLink(data?.data!)}
                iconSrc="/logo/logo.svg"
                size={isMobile ? 200 : 140}
              />
              <Icon name="ShareIcon" />
            </Stack>
          </>
        )}
      </ContentStack>
    </Stack>
  );
};

export default AffiliateHeader;
