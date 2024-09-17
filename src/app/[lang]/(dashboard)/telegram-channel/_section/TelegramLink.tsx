"use client";

import { Stack, Box, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useTranslate } from "@/locales";

const TelegramLink = () => {
  const { t } = useTranslate();
  const { copy } = useCopyToClipboard();
  const link = "https://t.me/Chainmind";
  const displayLink = link.replace("https://", "");
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{ border: "1.5px solid", borderColor: "dark.3", borderRadius: 3.5, p: 2, py: 1.5 }}
      spacing={2}
    >
      <Stack direction={"row"} spacing={1}>
        <Icon name="Link" />
        <Typography variant="p2-medium">{displayLink}</Typography>
        <Box
          sx={{
            mt: 1.5,
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            bgcolor: "dark.3",
          }}
        ></Box>
        <Stack direction={"row"} spacing={0.5} onClick={() => copy(link)} sx={{ cursor: "pointer" }}>
          <Icon name="Copy" />
          <Typography variant="p2-medium" sx={{ textTransform: "uppercase" }}>
            {t("telegramChannel.copy")}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TelegramLink;
