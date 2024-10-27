import { useTranslate } from "@/locales";
import { Box, Button, Stack, Typography } from "@mui/material";

const Head = () => {
  const { t } = useTranslate();
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ p: 4, position: "absolute", width: "100%" }}
    >
      <Stack direction={"row"} gap={2} alignItems={"center"}>
        <Button color="info" sx={{ zIndex: 3 }}>
          {t("secrethunt.howItWorks")}
        </Button>
        <Button color="info" sx={{ zIndex: 3 }}>
          {t("secrethunt.seeTheRules")}
        </Button>
      </Stack>
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="p2-medium" color={"grey.light"}>
          {t("secrethunt.todayleft")} :
        </Typography>
        <Box sx={{ px: 1, bgcolor: "dark.3", borderRadius: "6px" }}>
          <Typography color={"blue.light"}>3</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
export default Head;
