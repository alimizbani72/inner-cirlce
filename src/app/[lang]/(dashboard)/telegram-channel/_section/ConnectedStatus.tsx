"use cclient";

import { Stack, Typography, Box } from "@mui/material";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";

type ConnectedStatusProps = {
  telegramId: string | undefined;
};

const ConnectedStatus = ({ telegramId }: ConnectedStatusProps) => {
  const { t } = useTranslate();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ border: "1.5px solid", borderColor: "dark.3", borderRadius: 3.5, px: 2, py: 1.5 }}
      spacing={2}
    >
      <Stack direction={"row"} spacing={1}>
        <Box sx={{ path: { stroke: (theme) => theme.palette.success.main } }}>
          <Icon name="Check" />
        </Box>
        <Typography variant="p2-medium">{t("telegramChannel.connectedwith")}</Typography>
      </Stack>
      <Typography variant="p2-medium">{telegramId}</Typography>
    </Stack>
  );
};

export default ConnectedStatus;
