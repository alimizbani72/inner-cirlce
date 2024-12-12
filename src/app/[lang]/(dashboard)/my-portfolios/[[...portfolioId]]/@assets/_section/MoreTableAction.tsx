"use client";
import { Icon } from "@/components/icons";
import { MenuItem } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import ActionItem from "./ActionItem";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { usePortfolioServicePortfoliosIdAssetsSlugDeleteMutation } from "@minecraft/queries";
import { getActivePortfolioId } from "../../_section/utils";
import { invalidatePortfolioQueries } from "../../_section/InvaidatePorfolioQueries";
type MoreTableProps = {
  slug: string;
};
const MoreTableAction = ({ slug }: MoreTableProps) => {
  const { portfolioId } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const { onClose, onOpen, open } = usePopover();
  const activePortfolioId = getActivePortfolioId(portfolioId);
  const { mutateAsync } = usePortfolioServicePortfoliosIdAssetsSlugDeleteMutation();
  const handleDelete = async () => {
    await mutateAsync(
      { id: activePortfolioId, slug },
      {
        onSuccess: () => {
          invalidatePortfolioQueries(queryClient, {
            portfolioId: activePortfolioId,
            invalidatePortfolioId: true,
            invalidateHistory: true,
            invalidatePortfolio: true,
            invalidateOverview: true,
            invalidateoverviewhistory: true,
          });

          enqueueSnackbar(t("assetsTable.assetDeletesuccessMessage"), {
            variant: "success",
          });
          onClose();
        },
        onError: () => {
          enqueueSnackbar(t("assetsTable.assetDeleteerrorMessage"), {
            variant: "error",
          });
        },
      }
    );
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          onOpen(event);
        }}
      >
        <Icon name="More" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <MenuItem>
          <Stack spacing={2}>
            {/* <ActionItem iconName="Pen" label={t("assetsTable.edit")} />
            <Divider /> */}
            <ActionItem iconName="Trash" label={t("assetsTable.delete")} onClick={handleDelete} />
          </Stack>
        </MenuItem>
      </CustomMenu>
    </>
  );
};

export default MoreTableAction;
