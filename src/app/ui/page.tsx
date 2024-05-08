import {} from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Form from "./form";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Chainmind - UI",
};

const ICON = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="12.0009"
      cy="11.9999"
      r="8"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12.0009 8.99988V14.9999" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.0009 11.9999H9.00085" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function UI() {
  return (
    <Stack alignItems="center" gap={10} p={1.87}>
      <Typography color="white" variant="h1-medium">
        The quick brown fox jumps over the lazy.
      </Typography>

      <Stack direction={"row"} alignItems="center" gap={10}>
        <Button color="primary" size="large">
          Button
        </Button>
        <Button color="primary" size="medium">
          Button
        </Button>
        <Button color="primary" size="small" disabled endIcon={<ICON />}>
          Button
        </Button>

        <LoadingButton color="primary" size="small" loading>
          Button
        </LoadingButton>
      </Stack>

      <Stack direction={"row"} alignItems="center" gap={10}>
        <LoadingButton color="secondary" size="large" loading>
          LoadingButton
        </LoadingButton>
        <Button color="secondary" size="medium" startIcon={<ICON />}>
          Button
        </Button>
        <Button color="secondary" size="small" disabled>
          Button
        </Button>

        <LoadingButton color="secondary" size="small" loading>
          Button
        </LoadingButton>
      </Stack>
      <Stack gap={10} width="100%">
        <Button color="info" fullWidth startIcon={<ICON />}>
          Button
        </Button>
        <LoadingButton color="info" size="small" loading>
          Button
        </LoadingButton>
      </Stack>

      <Stack direction={"row"} alignItems="center" gap={10}>
        <IconButton color="primary" size="large">
          <ICON />
        </IconButton>

        <IconButton>
          <ICON />
        </IconButton>

        <IconButton color="secondary" size="medium">
          <ICON />
        </IconButton>

        <IconButton color="info" size="small">
          <ICON />
        </IconButton>

        <IconButton color="primary" size="small">
          <ICON />
        </IconButton>
      </Stack>

      <Stack direction={"row"} alignItems="center" gap={10}>
        <Form />
      </Stack>
    </Stack>
  );
}
