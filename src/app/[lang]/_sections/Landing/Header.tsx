import Link from "@/components/Link";
import LogoType from "@/components/LogoType";
import { Icon } from "@/components/icons";
import { headerMenu } from "@/configs/landingMenu";
import { useIsMobile } from "@/hooks/use-responsive";
import { mobileMenuToggle } from "@/lib/features/menu/menuSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import LandingContainer from "./LandingContainer";

interface HeaderProps {
  isLogin: boolean;
}

const Header: FC<HeaderProps> = ({ isLogin }) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  return (
    <Stack
      sx={{ borderBottom: "1px solid", borderColor: "dark.3" }}
      component={"header"}
      zIndex={1000}
      position={"relative"}
      alignItems={"center"}
    >
      {isMobile ? (
        <Stack px={3} pt={6} pb={2} direction="row" alignItems="center" justifyContent="center">
          <IconButton
            sx={{ position: "absolute", bottom: 24, left: 24 }}
            onClick={() => dispatch(mobileMenuToggle(true))}
          >
            <Icon name="Menu" />
          </IconButton>
          <LogoType />
        </Stack>
      ) : (
        <LandingContainer direction={"row"} alignItems="center" gap={5} sx={{ px: 3, py: 4 }}>
          <LogoType />

          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="#14162E" />
          </svg>

          {headerMenu.map((menuItem) => (
            <Link href={menuItem.link} key={menuItem.link}>
              <Typography variant="p2-medium" color="grey.light">
                {menuItem.title}
              </Typography>
            </Link>
          ))}

          {isLogin ? (
            <Button sx={{ ml: "auto" }} color="info" startIcon={<Icon name="User" />} href="/dashboard">
              Dashboard
            </Button>
          ) : (
            <Button sx={{ ml: "auto" }} href="/login">
              Join ChainMind
            </Button>
          )}
        </LandingContainer>
      )}
    </Stack>
  );
};

export default Header;
