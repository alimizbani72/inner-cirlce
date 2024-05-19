import ContentStack from "@app/_components/ContentStack";
import Link from "@/components/Link";
import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import { Stack, Typography } from "@mui/material";
import type { FC } from "react";

const socials = [
  { id: 1, title: "Twitter (X)", icon: "X", link: "http://twitter.com" },
  { id: 2, title: "Instagram", icon: "Instagram", link: "http://www.instagram.com" },
  { id: 3, title: "Tiktok", icon: "Tiktok", link: "https://tiktok.com" },
  { id: 4, title: "Google", icon: "Google", link: "https://www.google.com" },
];

const SocialMedia: FC = () => {
  return (
    <ContentStack sx={{ gap: 3 }}>
      <Typography variant="p1-semi-bold">Road Map</Typography>

      <Stack
        sx={{
          gap: { md: 2, xs: 1 },
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        {socials.map((i) => (
          <Stack
            gap={2}
            p={2}
            direction={"row"}
            borderRadius={1.5}
            bgcolor={"dark.3"}
            alignItems={"center"}
            justifyContent="flex-start"
            flex={1}
            href={i.link}
            sx={{ "&:hover": { textDecoration: "none" } }}
            component={Link}
          >
            <Icon name={i.icon as iconsType} />
            <Typography variant="p2-medium">{i.title}</Typography>
          </Stack>
        ))}
      </Stack>
    </ContentStack>
  );
};

export default SocialMedia;
