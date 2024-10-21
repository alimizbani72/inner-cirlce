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
import { usePortfolioServicePortfoliosIdAssetsSymbolDeleteMutation } from "@minecraft/queries";
import { getActivePortfolioId } from "../../_section/utils";
import { invalidatePortfolioQueries } from "../../_section/InvaidatePorfolioQueries";
type MoreTableProps = {
  symbol: string;
};
const MoreTableAction = ({ symbol }: MoreTableProps) => {
  const { portfolioId } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const { onClose, onOpen, open } = usePopover();
  const activePortfolioId = getActivePortfolioId(portfolioId);
  const { mutateAsync } = usePortfolioServicePortfoliosIdAssetsSymbolDeleteMutation();
  const handleDelete = async () => {
    await mutateAsync(
      { id: activePortfolioId, symbol },
      {
        onSuccess: () => {
          invalidatePortfolioQueries(queryClient, {
            portfolioId: activePortfolioId,
            invalidatePortfolioId: true,
            invalidateHistory: true,
            invalidatePortfolio: true,
          });

          enqueueSnackbar("Asset Deleted Successfully", {
            variant: "success",
          });
          onClose();
        },
        onError: () => {
          enqueueSnackbar("Fialed to delete Asset", {
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
