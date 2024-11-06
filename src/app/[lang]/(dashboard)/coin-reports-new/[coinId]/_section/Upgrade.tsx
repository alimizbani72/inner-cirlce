import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { Box, Button, Stack, Typography } from "@mui/material";

const Upgrade = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  return (
    <Stack
      sx={{
        height: "100%",
        bgcolor: "dark.2",
        border: "1px solid",
        borderColor: "dark.3",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.2 }}>
        <img src="/assets/svg/checkout-texture.svg" width={"100%"} height="100%" style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          background: (theme) => theme.palette.gradient.orange,
          width: 800,
          height: 150,
          borderRadius: "50%",
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(140px)",
        }}
      />

      <Box
        sx={{
          background: (theme) => theme.palette.dark[3],
          width: 400,
          height: 300,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      <Stack
        alignItems={"center"}
        zIndex={4}
        justifyContent={"center"}
        spacing={2}
        maxWidth={"600px"}
        my={isMobile ? 7 : undefined}
        px={3}
      >
        <Box sx={{ fill: (theme) => theme.palette.warning.main }}>
          <Icon name="Subscription--colorful" size={64} />
        </Box>
        <Stack spacing={1}>
          <Typography variant={isMobile ? "p1-semi-bold" : "h3-semi-bold"} textAlign={"center"}>
            {t("coinreportsingleview.upgradeYourAccount")}
          </Typography>
          <Typography variant="p2-regular" color={"grey.light"} textAlign={"center"}>
            {t("coinreportsingleview.upgradeDescription")}
          </Typography>
        </Stack>
        <Button size="large" sx={{ mt: 2, width: { xs: "100%", md: "auto" } }} href="/pricing">
          {t("coinreportsingleview.upgradeNow")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Upgrade;
