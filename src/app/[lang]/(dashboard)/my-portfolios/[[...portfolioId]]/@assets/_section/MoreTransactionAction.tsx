"use client";
import { Icon } from "@/components/icons";
import { Divider, MenuItem } from "@mui/material";
import { IconButton } from "@mui/material";
import ActionItem from "./ActionItem";
import CustomMenu from "@/components/CustomMenu";
import { useTranslate } from "@/locales";
import { usePopover } from "@/components/custom-popover";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { openEditMode, selectActiveSymbol } from "@/lib/features/portfolio/transactionSlice";
import { usePortfolioServicePortfolioTransactionsIdDeleteMutation } from "@minecraft/queries";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getActivePortfolioId } from "../../_section/utils";
import { Stack } from "@mui/material";
import { invalidatePortfolioQueries } from "../../_section/InvaidatePorfolioQueries";
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
          invalidatePortfolioQueries(queryClient, {
            portfolioId: getportfolioId,
            invalidatePortfolioId: true,
            invalidateHistory: true,
            invalidateTransactions: true,
            invalidatePortfolio: true,
            activeSymbol: activeSymbol!,
          });
          enqueueSnackbar(t("transaction.transactiondeleteSuccessMessage"), {
            variant: "success",
          });
          onClose();
        },
        onError: () => {
          enqueueSnackbar(t("transaction.transactiondeleteErrorMessage"), {
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
        <Stack direction="column" spacing={1}>
          <Stack>
            <MenuItem onClick={handleEditClick}>
              <ActionItem iconName="Pen" label={t("transaction.editTransaction")} />
            </MenuItem>
          </Stack>
          <Divider />
          <Stack>
            <MenuItem onClick={handleDelete}>
              <ActionItem iconName="Trash" label={t("transaction.deleteTransaction")} />
            </MenuItem>
          </Stack>
        </Stack>
      </CustomMenu>
    </>
  );
};

export default MoreTransactionAction;
