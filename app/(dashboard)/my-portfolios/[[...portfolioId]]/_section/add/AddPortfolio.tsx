"use client";

import Icon from "@/components/icon";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { Button, Stack, Typography } from "@mui/material";

import {
  openAddMode,
  selectIsModalOpen,
} from "@/lib/features/portfolio/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import AddPortfolioModal from "./AddPortfolioModal";

const AddPortfolio = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const dispatch = useAppDispatch();

  const open = useAppSelector(selectIsModalOpen);

  const handleOpen = () => {
    dispatch(openAddMode());
  };

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
        <img
          src="/assets/png/chartfrontview.png"
          width={256}
          height={256}
          alt="empty portfolio"
        />

        <Stack spacing={1}>
          <Typography variant={`${isMobile ? "h4" : "h3"}-semi-bold`}>
            {t("myPortfolio.getStartedFirstPortfolio")}
          </Typography>

          <Typography
            variant={`${isMobile ? "p2" : "p1"}-medium`}
            color="grey.light"
          >
            {t("myPortfolio.trackProfitsAndlossesMessage")}
          </Typography>
        </Stack>

        <Button
          size="large"
          startIcon={<Icon name="PlusIcon" />}
          onClick={handleOpen}
        >
          {t("myPortfolio.addPortfolio")}
        </Button>
      </Stack>

      {/* GLOBAL MODAL (Redux controlled) */}
      {open && <AddPortfolioModal />}
    </>
  );
};

export default AddPortfolio;
