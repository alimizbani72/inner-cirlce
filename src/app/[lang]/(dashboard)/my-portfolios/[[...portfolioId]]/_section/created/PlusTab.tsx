"use client";
import { Icon } from "@/components/icons";
import { IconButton } from "@mui/material";
import AddPortfolioModal from "../add/AddPortfolioModal";
import useToggleState from "@/hooks/use-toggle-state";
import { useTranslate } from "@/locales";
import CustomTooltip from "@/components/CustomTooltip";

const PlusTab = () => {
  const [open, toggle] = useToggleState();
  const { t } = useTranslate();
  return (
    <>
      <CustomTooltip
        title={t("portfolioSummary.createPorfolio")}
        sx={{ p: 2.5, mb: 1, bgcolor: "dark.3", borderRadius: "50%" }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
        >
          <Icon name="Plus" size={24} />
        </IconButton>
      </CustomTooltip>
      {open && <AddPortfolioModal open={open} close={toggle} isEditMode={false} />}
    </>
  );
};

export default PlusTab;
