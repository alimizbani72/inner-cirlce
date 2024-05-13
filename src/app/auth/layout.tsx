import { Grid, Stack, Typography } from "@mui/material";

import type { LayoutProps } from "../layout";
import TextureBox from "../_components/TextureBox";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <Grid container>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={6} display={{ sm: "none", md: "block" }}>
        <TextureBox>
          <Stack spacing={2} sx={{ px: 8, py: 11 }}>
            <img src="/logo/logo.svg" alt="chainmind logo" style={{ width: "180px", height: "48px" }} />
            <Typography variant="p2-regular">
              To simplify and enhance the cryptocurrency investment <br />
              experience for users of all levels.
            </Typography>
          </Stack>
        </TextureBox>
      </Grid>
    </Grid>
  );
}
