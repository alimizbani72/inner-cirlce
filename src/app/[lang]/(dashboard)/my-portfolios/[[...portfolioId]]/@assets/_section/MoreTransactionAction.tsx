"use client";
import { Icon } from "@/components/icons";
import { Divider, MenuItem } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import ActionItem from "./ActionItem";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openEditMode, selectActiveSymbol } from "@/lib/features/portfolio/transactionSlice";
import {
  usePortfolioServicePortfolioTransactionsIdDeleteMutation,
  UsePortfolioServicePortfolioTransactionsQueryKeyFn,
} from "@minecraft/queries";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getActivePortfolioId } from "../../_section/utils";
type TransactionType = {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  quantity: string;
  fee: string;
  price: string;
  date: string;
  note?: string;
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
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleEditClick = () => {
    dispatch(openEditMode(transaction));
    onClose();
  };

  const { mutateAsync } = usePortfolioServicePortfolioTransactionsIdDeleteMutation();

  const handleDelete = async () => {
    await mutateAsync(
      { id: transaction.id as any },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: UsePortfolioServicePortfolioTransactionsQueryKeyFn({
              opts: JSON.stringify({
                filters: {
                  symbol: activeSymbol,
                  portfolio_id: getActivePortfolioId(portfolioId),
                },
                page: 1,
                per_page: 15,
              }),
            }),
          });
          enqueueSnackbar("Transaction Deleted Successfully", {
            variant: "success",
          });
          onClose();
        },
        onError: () => {
          enqueueSnackbar("Fialed to delete transaction", {
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
            <ActionItem iconName="Pen" label={t("transaction.editTransaction")} onClick={handleEditClick} />
            <Divider />
            <ActionItem iconName="Trash" label={t("transaction.deleteTransaction")} onClick={handleDelete} />
          </Stack>
        </MenuItem>
      </CustomMenu>
    </>
  );
};

export default MoreTransactionAction;
