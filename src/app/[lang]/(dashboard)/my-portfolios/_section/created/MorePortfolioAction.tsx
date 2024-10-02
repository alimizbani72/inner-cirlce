import { Icon } from "@/components/icons";
import { Divider, MenuItem } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import CustomMenu from "@/components/CustomMenu";
import ActionItem from "@dashboard/my-portfolios/@assets/_section/ActionItem";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";

const MorePortfolioAction = () => {
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
            <ActionItem iconName="Pen" label={t("portfolioSummary.editPOrtfolio")} />
            <Divider />
            <ActionItem iconName="Trash" label={t("portfolioSummary.deletePOrtfolio")} />
          </Stack>
        </MenuItem>
      </CustomMenu>
    </>
  );
};

export default MorePortfolioAction;
