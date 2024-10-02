import { Icon } from "@/components/icons";
import { Divider } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import type React from "react";
import { useState } from "react";
import CustomMenu from "@/components/CustomMenu";
import ActionItem from "@dashboard/my-portfolios/@assets/_section/ActionItem";
import { useTranslate } from "@/locales";

const MorePortfolioAction = () => {
  const { t } = useTranslate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Icon name="More" />
      </IconButton>

      <CustomMenu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
        <Stack spacing={2}>
          <ActionItem iconName="Pen" label={t("portfolioSummary.editPOrtfolio")} />
          <Divider />
          <ActionItem iconName="Trash" label={t("portfolioSummary.deletePOrtfolio")} />
        </Stack>
      </CustomMenu>
    </>
  );
};

export default MorePortfolioAction;
