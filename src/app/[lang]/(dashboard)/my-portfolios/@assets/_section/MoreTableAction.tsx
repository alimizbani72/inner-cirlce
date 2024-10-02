"use client";
import { Icon } from "@/components/icons";
import { Divider } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import type React from "react";
import { useState } from "react";
import ActionItem from "./ActionItem";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";

const MoreTableAction = () => {
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
          <ActionItem iconName="Pen" label={t("assetsTable.edit")} />
          <Divider />
          <ActionItem iconName="Trash" label={t("assetsTable.delete")} />
        </Stack>
      </CustomMenu>
    </>
  );
};

export default MoreTableAction;
