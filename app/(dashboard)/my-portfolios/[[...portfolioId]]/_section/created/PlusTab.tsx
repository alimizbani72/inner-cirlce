"use client";
import CustomTooltip from "@/components/CustomTooltip";
import Icon from "@/components/icon";
import {
  openAddMode,
  selectIsModalOpen,
} from "@/lib/features/portfolio/protfolioSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { IconButton } from "@mui/material";
import AddPortfolioModal from "../add/AddPortfolioModal";

const PlusTab = () => {
  const dispatch = useAppDispatch();

  const open = useAppSelector(selectIsModalOpen);

  const handleOpen = () => {
    dispatch(openAddMode());
  };

  const { t } = useTranslate();
  return (
    <>
      <CustomTooltip
        title={t("portfolioSummary.createPorfolio")}
        sx={{ mb: 1, bgcolor: "dark.3", borderRadius: "50%" }}
      >
        <IconButton
          sx={{ minWidth: 64, minHeight: 64, bgcolor: "dark.3" }}
          onClick={handleOpen}
        >
          <Icon name="PlusIcon" size={24} />
        </IconButton>
      </CustomTooltip>
      {open && <AddPortfolioModal />}
    </>
  );
};

export default PlusTab;
