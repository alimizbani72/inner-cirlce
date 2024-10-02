"use client";
import { Icon } from "@/components/icons";
import { Divider, MenuItem } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import ActionItem from "./ActionItem";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";

const MoreTableAction = () => {
  const { t } = useTranslate();
  const { onClose, onOpen, open } = usePopover();
  return (
    <>
      <IconButton onClick={onOpen}>
        <Icon name="More" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <MenuItem>
          <Stack spacing={2}>
            <ActionItem iconName="Pen" label={t("assetsTable.edit")} />
            <Divider />
            <ActionItem iconName="Trash" label={t("assetsTable.delete")} />
          </Stack>
        </MenuItem>
      </CustomMenu>
    </>
  );
};

export default MoreTableAction;
