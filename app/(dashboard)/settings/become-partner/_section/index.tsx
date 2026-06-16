"use client";

import { Image } from "@/components/image";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const BecomeAPartnerSection = () => {
  const lang = useAppSelector(selectLang);
  const { push } = useAppRouter();
  const { t } = useTranslate();

  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState<{
    text: string;
    button: string;
  } | null>(null);

  // simulate API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        text:
          lang === "fa"
            ? "با ما شریک شوید و درآمد خود را افزایش دهید."
            : "Partner with us and grow your income.",
        button: lang === "fa" ? "شروع کنید" : "Get Started",
      });
      setIsFetching(false);
    }, 800); // fake delay

    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      p={{ md: 4, xs: 3 }}
      gap={{ md: 4, xs: 3 }}
    >
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          {t("becomePartner.title")}
        </Typography>
      </Stack>

      <Stack
        maxWidth={{ md: 360 }}
        gap={3}
        justifyContent="center"
        alignItems="center"
      >
        <Image src="/assets/png/partner.png" />

        {isFetching ? (
          <Skeleton height={200} width="100%" />
        ) : (
          <>
            <Typography variant="p2-regular">{data?.text}</Typography>

            <Button fullWidth onClick={() => push("become-partner/kyc-info")}>
              {data?.button}
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default BecomeAPartnerSection;
