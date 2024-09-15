"use client";

import Image from "@/components/Image";
import { useAppRouter } from "@/routes/hooks";
import { useGlobalBecomeApartnerServiceGetGlobalsBecomeApartner } from "@cms/queries";
import { Button, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const BecomeAPartnerSection = () => {
  const { lang } = useParams();
  const { push } = useAppRouter();
  const { data } = useGlobalBecomeApartnerServiceGetGlobalsBecomeApartner({ locale: lang as string });

  return (
    <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          Become a Partner
        </Typography>
      </Stack>

      <Stack maxWidth={{ md: 360 }} gap={3} justifyContent={"center"} alignItems={"center"}>
        <Image src="/assets/png/partner.png" />
        <Typography variant="p2-regular">{data?.text}</Typography>
        <Button fullWidth onClick={() => push("kyc-info")}>
          {data?.button}
        </Button>
      </Stack>
    </Stack>
  );
};

export default BecomeAPartnerSection;
