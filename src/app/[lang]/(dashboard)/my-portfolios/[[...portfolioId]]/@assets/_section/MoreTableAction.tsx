"use client";
import { Icon } from "@/components/icons";
import { Divider, MenuItem } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import ActionItem from "./ActionItem";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import {
  usePortfolioServicePortfoliosIdAssetsSymbolDeleteMutation,
  UsePortfolioServicePortfoliosIdQueryKeyFn,
} from "@minecraft/queries";
import { getActivePortfolioId } from "../../_section/utils";
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
          queryClient.invalidateQueries({
            queryKey: UsePortfolioServicePortfoliosIdQueryKeyFn({
              id: activePortfolioId,
            }),
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
      <IconButton onClick={onOpen}>
        <Icon name="More" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <MenuItem>
          <Stack spacing={2}>
            <ActionItem iconName="Pen" label={t("assetsTable.edit")} />
            <Divider />
            <ActionItem iconName="Trash" label={t("assetsTable.delete")} onClick={handleDelete} />
          </Stack>
        </MenuItem>
      </CustomMenu>
    </>
  );
};

export default MoreTableAction;
