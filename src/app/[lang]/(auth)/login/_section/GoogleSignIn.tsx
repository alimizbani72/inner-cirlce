"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icon } from "@/components/icons";

const GoogleSignIn = () => {
  const searchParams = useSearchParams();
  return (
    <Stack spacing={2}>
      <Button
        fullWidth
        color="info"
        startIcon={<Icon name="Google" />}
        onClick={() => signIn("google", { redirect: true, callbackUrl: "/dashboard" })}
      >
        Continue with Google
      </Button>
      {searchParams.has("error") && (
        <Typography variant="p2-medium" color="error.main">
          Oops! Something went wrong with the Google sign-in process. Please try again or use a different method to log
          in. If you continue to experience issues, feel free to reach out to our support team for assistance
        </Typography>
      )}
    </Stack>
  );
};

export default GoogleSignIn;
