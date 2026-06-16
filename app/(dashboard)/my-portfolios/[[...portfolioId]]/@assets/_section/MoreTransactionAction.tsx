import CustomMenu from "@/components/CustomMenu";
import Icon from "@/components/icon";
import {
  openEditMode,
  selectActiveSymbol,
} from "@/lib/features/portfolio/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import { Divider, IconButton, MenuItem, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { invalidatePortfolioQueries } from "../../_section/InvaidatePorfolioQueries";
import { getActivePortfolioId } from "../../_section/utils";
import ActionItem from "./ActionItem";

import usePopover from "@/components/custom-popover/use-popover";

type DeleteTransactionParams = {
  id: string;
};

// 👉 fake API (no backend yet)
const deleteTransactionApi = async ({ id }: DeleteTransactionParams) => {
  // simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  return {
    success: true,
    id,
  };
};

export const useDeletePortfolioTransactionsId = () => {
  return useMutation({
    mutationFn: deleteTransactionApi,
  });
};
type TransactionType = {
  id: string;
  symbol: string;
  slug: string;
  type: "buy" | "sell";
  quantity: string;
  fee: string;
  price: string;
  date: string;
  note?: string;
  logo: string;
  name: string;
};
type Props = {
  transaction: TransactionType;
};
const MoreTransactionAction = ({ transaction }: Props) => {
  const { portfolioId } = useParams();
  const { t } = useTranslate();
  const { onClose, onOpen, open } = usePopover();
  const queryClient = useQueryClient();
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const getportfolioId = getActivePortfolioId(portfolioId);
  const dispatch = useAppDispatch();
  const handleEditClick = () => {
    dispatch(openEditMode(transaction));
    onClose();
  };

  const { mutateAsync } = useDeletePortfolioTransactionsId();

  const handleDelete = async () => {
    try {
      await mutateAsync({
        id: transaction.id as any,
      });
      invalidatePortfolioQueries(queryClient, {
        portfolioId: getportfolioId,
        invalidatePortfolioId: true,
        invalidateHistory: true,
        invalidateTransactions: true,
        invalidatePortfolio: true,
        activeSymbol: activeSymbol!,
      });

      toast.success(t("transaction.transactiondeleteSuccessMessage"));
      onClose();
    } catch (error) {
      toast.error(t("transaction.transactiondeleteErrorMessage"));
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <>
      <IconButton onClick={onOpen}>
        <Icon name="MoreIcon" />
      </IconButton>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose}>
        <Stack direction="column" spacing={1}>
          <Stack>
            <MenuItem onClick={handleEditClick}>
              <ActionItem
                iconName="PenIcon"
                label={t("transaction.editTransaction")}
              />
            </MenuItem>
          </Stack>
          <Divider />
          <Stack>
            <MenuItem onClick={handleDelete}>
              <ActionItem
                iconName="TrashIcon"
                label={t("transaction.deleteTransaction")}
              />
            </MenuItem>
          </Stack>
        </Stack>
      </CustomMenu>
    </>
  );
};

export default MoreTransactionAction;
