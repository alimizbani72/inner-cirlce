import Link from "@/components/Link";
import LogoType from "@/components/LogoType";
import { Icon } from "@/components/icons";
import { footerMenu, footerSocials } from "@/configs/landingMenu";
import { Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import LandingContainer from "./LandingContainer";
import LanguageSelect from "@dashboard/_profile_draft/_section/LangSelector";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <Stack
      component={"footer"}
      zIndex={1000}
      position={"relative"}
      alignItems={"center"}
      gap={4}
      pt={4}
      pb={{ md: 4, xs: 8 }}
    >
      <LandingContainer
        direction={{ md: "row" }}
        alignItems={{ md: "center" }}
        justifyContent={"space-between"}
        gap={4}
        px={3}
      >
        <LogoType />

        <Stack gap={{ md: 5, xs: 2 }} direction={"row"} flexWrap={"wrap"} alignItems="center">
          {footerMenu.map((menuItem) => (
            <Link href={menuItem.link} key={menuItem.link}>
              <Typography variant="p2-medium" color="grey.light">
                {menuItem.title}
              </Typography>
            </Link>
          ))}
        </Stack>
      </LandingContainer>

      <Divider flexItem sx={{ borderColor: "dark.3", borderWidth: "1.5px" }} />

      <LandingContainer direction={{ md: "row" }} width={"100%"} justifyContent={"space-between"} gap={4} px={3}>
        <Typography variant="p2-regular" color={"grey.light"}>
          Copyright © {new Date().getFullYear()} ChainMind. All rights reserved.
        </Typography>

        <Stack direction="row" gap={4} alignItems="center">
          <LanguageSelect />
          <Stack direction="row" gap={3} sx={{ path: { stroke: (theme) => theme.palette.grey.light } }}>
            {footerSocials.map((social) => (
              <Link href={social.link} key={social.link}>
                <Icon name={social.icon as any} />
              </Link>
            ))}
          </Stack>
        </Stack>
      </LandingContainer>
    </Stack>
  );
};

export default Footer;
