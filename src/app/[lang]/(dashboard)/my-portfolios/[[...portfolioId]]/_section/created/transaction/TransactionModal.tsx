"use client";
import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { Icon } from "@/components/icons";
import Toggle from "@app/_components/Toggle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useToggleState from "@/hooks/use-toggle-state";
import DateAndTimeModal from "./DateAndTimeModal";
import { formatDateTime } from "@/utils/formatDateTime";
import NoteModal from "./NoteModal";
import CustomBadge from "./CustomBadge";
import { useTranslate } from "@/locales";
import {
  usePortfolioServiceCoinsSymbolPriceQuery,
  UsePortfolioServicePortfoliosIdQueryKeyFn,
  usePortfolioServicePortfolioTransactionsCreateMutation,
  usePortfolioServicePortfolioTransactionsIdUpdateMutation,
  UsePortfolioServicePortfolioTransactionsQueryKeyFn,
} from "@minecraft/queries";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { fDate } from "@/utils/format-time";
import { toNumber } from "@/utils/toNumber";
import { getActivePortfolioId } from "../../utils";
import Bullets from "../../Bullets";
import {
  closeTransactionModal,
  selectActiveSymbol,
  selectIsEditMode,
  selectIsModalOpen,
  selectTransactionToEdit,
} from "@/lib/features/portfolio/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import CoinsList from "./CoinsList";

// type TransactionModalProps = {
//   coinsList: Coin[];
//   // totalCount: number;
//   // onPageChange: (newPage: number) => void;
//   // page: number;
//   isLoading: boolean;
//   setSearchQuery: (value: string) => void;
// };

const TransactionModal = () => {
  const { t } = useTranslate();
  const buttons = useMemo(
    () => [
      {
        label: (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Bullets bgcolor="success.main" />
            {t("portfolioTransaction.buy")}
          </Stack>
        ),
        value: 1,
      },
      {
        label: (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Bullets bgcolor="danger.main" />
            {t("portfolioTransaction.sell")}
          </Stack>
        ),
        value: 2,
      },
    ],
    [t]
  );
  const { portfolioId } = useParams();
  const isEditMode = useAppSelector(selectIsEditMode);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const transactionToEdit = useAppSelector(selectTransactionToEdit);
  const initialDate = isEditMode && transactionToEdit ? new Date(transactionToEdit.date) : null;
  const [btnValue, setBtnValue] = useState<number>(isEditMode && transactionToEdit?.type === "sell" ? 2 : 1);
  const [dateModalIsOpen, toggleDateAndTimeModal] = useToggleState();
  const [noteModalIsOpen, toggleNoteModal] = useToggleState();
  const [dateTime, setDateTime] = useState<Date | null>(initialDate);
  const [note, setNote] = useState<string>(transactionToEdit?.note || "");

  const { mutateAsync: createTransaction, isPending: createIsPending } =
    usePortfolioServicePortfolioTransactionsCreateMutation();
  const { mutateAsync: updateTransaction, isPending: updateIsPending } =
    usePortfolioServicePortfolioTransactionsIdUpdateMutation();

  const formSchema = useMemo(
    () =>
      Yup.object().shape({
        coins: Yup.mixed().nullable(),
        quantity: Yup.string().required(),
        price: Yup.string(),
        fee: Yup.string().required(),
      }),
    [t]
  );
  // const defaultValues = useMemo(() => {
  //   if (isEditMode && transactionToEdit) {
  //     return {
  //       coins: transactionToEdit.symbol,
  //       quantity: transactionToEdit.quantity,
  //       price: transactionToEdit.price,
  //       fee: transactionToEdit.fee,
  //     };
  //   }
  //   return {
  //     coins: coinsList[0].symbol || "",
  //     quantity: "",
  //     price: "",
  //     fee: "",
  //   };
  // }, [isEditMode, transactionToEdit, coinsList]);
  const defaultValues = {
    coins: null,
    quantity: transactionToEdit ? transactionToEdit.quantity : "",
    price: transactionToEdit ? transactionToEdit.price : "",
    fee: transactionToEdit ? transactionToEdit.fee : "",
  };

  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: defaultValues,
    mode: "onSubmit",
  });

  const handleButtonChange = (newValue: any) => {
    setBtnValue(newValue);
  };

  const { handleSubmit, watch } = methods;

  const selectedCoinSymbol = (watch("coins") as any)?.symbol;

  const { data: perCoinPrice } = usePortfolioServiceCoinsSymbolPriceQuery(
    {
      symbol: selectedCoinSymbol,
    },
    undefined,
    { enabled: !!selectedCoinSymbol }
  );

  const activePortfolioId = getActivePortfolioId(portfolioId);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formattedDate = fDate(dateTime, "yyyy-MM-dd") ?? undefined;
      const transactionType = btnValue === 1 ? "buy" : "sell";

      const requestBody = {
        type: transactionType,
        date: formattedDate,
        fee: toNumber(data.fee),
        note: note,
        price: toNumber(perCoinPrice?.data),
        quantity: toNumber(data.quantity),
        symbol: (data.coins as any)?.symbol,
        ...(isEditMode ? {} : { portfolio_id: activePortfolioId }),
      };

      const mutationFn =
        isEditMode && transactionToEdit
          ? updateTransaction({ id: transactionToEdit.id as any, requestBody })
          : createTransaction({ requestBody });

      await mutationFn;

      queryClient.invalidateQueries({
        queryKey: UsePortfolioServicePortfolioTransactionsQueryKeyFn({
          opts: JSON.stringify({
            filters: {
              symbol: activeSymbol,
              portfolio_id: activePortfolioId,
            },
            page: 1,
            per_page: 15,
          }),
        }),
      });
      if (!isEditMode) {
        queryClient.invalidateQueries({
          queryKey: UsePortfolioServicePortfoliosIdQueryKeyFn({
            id: activePortfolioId,
          }),
        });
      }

      dispatch(closeTransactionModal());
    } catch (_error) {
      enqueueSnackbar(
        `${isEditMode ? t("portfolioTransaction.udateErrorMessage") : t("portfolioTransaction.createErrorMessage")}`,
        { variant: "error" }
      );
    }
  });

  const isSubmitDisabled = !dateTime;

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={() => dispatch(closeTransactionModal())}
      aria-labelledby="Transaction-dialog"
      open={isModalOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="Transaction-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold">
            {isEditMode ? "Update Transaction" : t("portfolioTransaction.addTransaction")}
          </Typography>
          <IconButton onClick={() => dispatch(closeTransactionModal())}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
          <Toggle size="large" setValue={handleButtonChange} buttons={buttons} value={btnValue} width="100%" />
          <CoinsList />
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField
              name="quantity"
              label={t("portfolioTransaction.quantity")}
              placeholder={t("portfolioTransaction.enterQuentity")}
              topHelperText={t("portfolioTransaction.topQuantityHelpText")}
            />
            <RHFTextField
              topHelperText={t("portfolioTransaction.topPricePerCoinHelpText")}
              value={perCoinPrice?.data || ""}
              name="price_per_coin"
              label={t("portfolioTransaction.pricePerCoin")}
              InputProps={{ readOnly: true }}
            />
          </Stack>

          <RHFTextField
            topHelperText={t("portfolioTransaction.topFeeHelpText")}
            name="fee"
            label={t("portfolioTransaction.fee")}
            placeholder={t("portfolioTransaction.enterTheFee")}
          />

          <Stack direction={"row"} spacing={1} flexWrap={"wrap"}>
            <CustomBadge
              icon="Clock"
              value={formatDateTime(dateTime, t("portfolioTransaction.dateAndTime"))}
              onClick={toggleDateAndTimeModal}
            />

            <CustomBadge icon="Pen" value={t("portfolioTransaction.notes")} onClick={toggleNoteModal} />
          </Stack>
        </FormProvider>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Stack>
            <Typography variant="p1-medium">$0</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              {btnValue === 1 ? t("portfolioTransaction.totalSpent") : t("portfolioTransaction.totalReceived")}
            </Typography>
          </Stack>
          <LoadingButton
            onClick={onSubmit}
            size="large"
            disabled={isSubmitDisabled}
            loading={createIsPending || updateIsPending}
          >
            {isEditMode ? "Update Transaction" : t("portfolioTransaction.addTransaction")}
          </LoadingButton>
        </Stack>
      </DialogActions>

      {dateModalIsOpen && (
        <DateAndTimeModal
          open={dateModalIsOpen}
          close={toggleDateAndTimeModal}
          onConfirm={(dateTime) => setDateTime(dateTime)}
          initialDate={dateTime}
        />
      )}
      {noteModalIsOpen && (
        <NoteModal
          open={noteModalIsOpen}
          close={toggleNoteModal}
          onConfirm={(newNote) => setNote(newNote)}
          initialNote={note}
        />
      )}
    </CustomDialog>
  );
};

export default TransactionModal;
