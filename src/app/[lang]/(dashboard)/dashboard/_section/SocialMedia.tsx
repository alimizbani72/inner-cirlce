"use client";

import ContentStack from "@app/_components/ContentStack";
import Link from "@/components/Link";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useGlobalSocialMediaServiceGetGlobalsSocialMedia } from "@cms/queries";
import { useParams } from "next/navigation";
import Image from "@/components/Image";
import type { media } from "@cms/requests";
import { CMSDownloadURL } from "@/consts";

const SocialMedia: FC = () => {
  const { lang } = useParams();
  const { data } = useGlobalSocialMediaServiceGetGlobalsSocialMedia({ locale: lang as string });

  if (!data?.socialLinks?.length) {
    return null;
  }

  return (
    <ContentStack sx={{ gap: 3 }}>
      <Typography variant="p1-semi-bold">Socials</Typography>

      <Stack
        sx={{
          gap: { md: 2, xs: 1 },
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        {data?.socialLinks?.map((i) => (
          <Stack
            key={i.id}
            gap={2}
            p={2}
            direction={"row"}
            borderRadius={1.5}
            bgcolor={"dark.3"}
            alignItems={"center"}
            justifyContent="flex-start"
            flex={1}
            href={i.url}
            sx={{ "&:hover": { textDecoration: "none" } }}
            component={Link}
          >
            <Image src={CMSDownloadURL((i?.icon as media)?.url!)} width={24} height={24} />
            <Typography variant="p2-medium">{i.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </ContentStack>
  );
};

export default SocialMedia;
