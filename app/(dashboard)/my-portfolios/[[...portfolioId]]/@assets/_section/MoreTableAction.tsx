"use client";
import CustomMenu from "@/components/CustomMenu";
import usePopover from "@/components/custom-popover/use-popover";
import Icon from "@/components/icon";
import { useTranslate } from "@/locales";
import { IconButton, MenuItem, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { invalidatePortfolioQueries } from "../../_section/InvaidatePorfolioQueries";
import { getActivePortfolioId } from "../../_section/utils";
import ActionItem from "./ActionItem";

import { useMutation } from "@tanstack/react-query";

type DeleteAssetParams = {
  id: string;
  slug: string;
};

// 👉 fake API (since no backend exists)
const deleteAssetApi = async ({ id, slug }: DeleteAssetParams) => {
  // simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  // simulate success response
  return {
    success: true,
    id,
    slug,
  };
};

export const useDeletePortfoliosIdAssetsSlug = () => {
  return useMutation({
    mutationFn: deleteAssetApi,
  });
};
type MoreTableProps = {
  slug: string;
};
const MoreTableAction = ({ slug }: MoreTableProps) => {
  const { portfolioId } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslate();
  const { onClose, onOpen, open } = usePopover();
  const activePortfolioId = getActivePortfolioId(portfolioId);
  const { mutateAsync } = useDeletePortfoliosIdAssetsSlug();
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
          });

          toast.success(
            `${slug} ${t("assetsTable.assetDeletesuccessMessage")}`,
          );
          onClose();
        },
        onError: () => {
          toast.error(`${t("assetsTable.assetDeleteerrorMessage")} ${slug}`);
        },
      },
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
        <Icon name="MoreIcon" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <MenuItem>
          <Stack spacing={2}>
            {/* <ActionItem iconName="Pen" label={t("assetsTable.edit")} />
            <Divider /> */}
            <ActionItem
              iconName="TrashIcon"
              label={t("assetsTable.delete")}
              onClick={handleDelete}
            />
          </Stack>
        </MenuItem>
      </CustomMenu>
    </>
  );
};

export default MoreTableAction;
