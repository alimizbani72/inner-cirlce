"use client";
import { Icon } from "@/components/icons";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddPortfolioModal from "../add/AddPortfolioModal";
import useToggleState from "@/hooks/use-toggle-state";
import { useTranslate } from "@/locales";

const PlusTab = () => {
  const [open, toggle] = useToggleState();
  const { t } = useTranslate();
  return (
    <>
      <Tooltip
        title={t("portfolioSummary.createPorfolio")}
        arrow
        placement="top"
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "dark.3",
              color: "white",
              fontSize: (theme) => theme.typography["p2-medium"],
              px: 1.5,
              borderRadius: 2,
            },
          },
          arrow: {
            sx: {
              color: "dark.3",
            },
          },
        }}
      >
        <Box
          onClick={toggle}
          sx={{
            cursor: "pointer",
            borderRadius: "50%",
            p: 2.5,
            bgcolor: "dark.3",
          }}
        >
          <IconButton>
            <Icon name="Plus" size={24} />
          </IconButton>
        </Box>
      </Tooltip>
      {open && <AddPortfolioModal open={open} close={toggle} />}
    </>
  );
};

export default PlusTab;
