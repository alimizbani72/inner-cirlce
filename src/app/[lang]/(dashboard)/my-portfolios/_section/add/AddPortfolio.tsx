"use client";
import { Icon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-responsive";
import useToggleState from "@/hooks/use-toggle-state";
import { Button, Stack, Typography } from "@mui/material";
import AddPortfolioModal from "./AddPortfolioModal";
import { useTranslate } from "@/locales";

const AddPortfolio = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const [open, toggle] = useToggleState();
  return (
    <>
      <Stack
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          pt: { md: 0, xs: 7.5 },
          px: 3,
        }}
        spacing={isMobile ? 4 : 5}
      >
        <img src="/assets/png/chartfrontview.png" width={256} height={256} />
        <Stack spacing={1}>
          <Typography variant={`${isMobile ? "h4" : "h3"}-semi-bold`}>
            {t("myPortfolio.getStartedFirstPortfolio")}
          </Typography>
          <Typography variant={`${isMobile ? "p2" : "p1"}-medium`} color={"grey.light"}>
            {t("myPortfolio.trackProfitsAndlossesMessage")}
          </Typography>
        </Stack>
        <Button size="large" startIcon={<Icon name="Plus" />} onClick={toggle}>
          {t("myPortfolio.addPortfolio")}
        </Button>
      </Stack>
      {open && <AddPortfolioModal open={open} close={toggle} />}
    </>
  );
};

export default AddPortfolio;
