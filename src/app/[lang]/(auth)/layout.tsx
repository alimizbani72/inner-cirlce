import { Box, Container, Stack } from "@mui/material";

import type { LayoutProps } from "@app/layout";
import TextureBox from "@app/_components/TextureBox";
import Link from "@/components/Link";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <Stack direction={"row"}>
      <Box sx={{ flex: 1 }}>
        <Container maxWidth={false} sx={{ height: "100dvh" }}>
          <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
            <Stack sx={{ width: "100%", maxWidth: "456px" }} justifyContent={"center"} spacing={4}>
              <Link href={"/"}>
                <img
                  src="/logo/logo-type.svg"
                  alt="chainmind logo"
                  style={{ width: "180px", height: "48px", alignSelf: "flex-start" }}
                />
              </Link>
              {children}
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box display={{ xs: "none", md: "block" }} sx={{ flex: 1 }}>
        <TextureBox>
          <Stack spacing={2} sx={{ px: 8 }}>
            {/* <LayoutText /> */}
          </Stack>
        </TextureBox>
      </Box>
    </Stack>
  );
}
