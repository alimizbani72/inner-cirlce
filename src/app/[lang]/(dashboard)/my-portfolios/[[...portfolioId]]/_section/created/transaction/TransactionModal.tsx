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
import { useTranslate } from "@/locales";
import {
  usePortfolioServiceCoinsSlugPriceQuery,
  usePortfolioServicePortfolioTransactionsCreateMutation,
  usePortfolioServicePortfolioTransactionsIdUpdateMutation,
} from "@minecraft/queries";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { fDate } from "@/utils/format-time";
import { getActivePortfolioId, parseToNumber } from "../../utils";
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
import PriceInput from "./PriceInput";
import { invalidatePortfolioQueries } from "../../InvaidatePorfolioQueries";
import Total from "./Total";
import Image from "@/components/Image";
import FeeTooltip from "./FeeTooltip";
import DateInput from "./DateInput";

const formSchema = Yup.object().shape({
  coins: Yup.mixed().nullable(),
  quantity: Yup.string().required(),
  price: Yup.string(),
  fee: Yup.string(),
  note: Yup.string(),
});
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
  const [dateTime, setDateTime] = useState<Date | null>(initialDate);

  const { mutateAsync: createTransaction, isPending: createIsPending } =
    usePortfolioServicePortfolioTransactionsCreateMutation();
  const { mutateAsync: updateTransaction, isPending: updateIsPending } =
    usePortfolioServicePortfolioTransactionsIdUpdateMutation();

  const defaultValues = {
    coins: transactionToEdit ? transactionToEdit.symbol : null,
    quantity: transactionToEdit ? transactionToEdit.quantity : "",
    price: transactionToEdit ? transactionToEdit.price : "",
    fee: transactionToEdit ? transactionToEdit.fee : "",
    note: transactionToEdit ? transactionToEdit.note : "",
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
  const selectedCoinSymbol = (watch("coins") as any)?.slug;
  const quantity = parseToNumber(watch("quantity"));
  const fee = parseToNumber(watch("fee"));
  const price = parseToNumber(watch("price"));

  const { data: perCoinPrice } = usePortfolioServiceCoinsSlugPriceQuery(
    {
      slug: selectedCoinSymbol,
    },
    undefined,
    { enabled: !!selectedCoinSymbol }
  );

  const activePortfolioId = getActivePortfolioId(portfolioId);

  const onSubmit = handleSubmit(async (data) => {
    const formattedDate = fDate(dateTime, "yyyy-MM-dd") ?? undefined;
    const transactionType = btnValue === 1 ? "buy" : "sell";

    const requestBody = {
      type: transactionType,
      date: formattedDate,
      fee: parseToNumber(data.fee),
      note: data.note,
      price: parseToNumber(data.price),
      quantity: parseToNumber(data.quantity),
      ...(isEditMode ? {} : { slug: (data.coins as any)?.slug }),
      ...(isEditMode ? {} : { portfolio_id: activePortfolioId }),
    };
    try {
      if (isEditMode && transactionToEdit) {
        await updateTransaction({
          id: transactionToEdit.id as any,
          requestBody,
        });
      } else {
        await createTransaction({
          requestBody,
        });
      }
      invalidatePortfolioQueries(queryClient, {
        portfolioId: activePortfolioId,
        activeSymbol: activeSymbol!,
        invalidateHistory: true,
        invalidatePortfolio: true,
        invalidatePortfolioId: true,
        invalidateTransactions: true,
      });

      dispatch(closeTransactionModal());
    } catch (_error) {
      const errorMessage = isEditMode
        ? t("portfolioTransaction.udateErrorMessage")
        : t("portfolioTransaction.createErrorMessage");

      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    }
  });
  const isSubmitDisabled = !dateTime || quantity === 0;

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
          {isEditMode ? (
            <Stack
              direction={"row"}
              p={2}
              spacing={1}
              sx={{ border: "2px solid", borderColor: "dark.3", borderRadius: 1.5, width: "100%" }}
            >
              <Image src={transactionToEdit?.logo} style={{ width: "24px", height: "24px" }} />
              <Typography>{transactionToEdit?.name}</Typography>
              <Typography>{transactionToEdit?.symbol}</Typography>
            </Stack>
          ) : (
            <CoinsList />
          )}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <RHFTextField
              name="quantity"
              label={t("portfolioTransaction.quantity")}
              placeholder={t("portfolioTransaction.enterQuantity")}
              type="number"
              isMoney
            />
            <PriceInput
              name="price"
              label={t("portfolioTransaction.pricePerCoin")}
              isEditMode={isEditMode}
              perCoinPrice={perCoinPrice?.data}
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <DateInput onConfirm={(dateTime) => setDateTime(dateTime)} initialDate={dateTime} />
            <Stack spacing={1} width={"100%"}>
              <FeeTooltip />
              <RHFTextField name="fee" placeholder={t("portfolioTransaction.enterTheFee")} type="number" isMoney />
            </Stack>
          </Stack>
          <RHFTextField
            name="note"
            label={t("portfolioTransaction.note")}
            multiline
            placeholder={t("portfolioTransaction.notePlaceholder")}
          />
        </FormProvider>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Stack>
            <Total btnValue={btnValue} fee={fee} price={price} quantity={quantity} />
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
    </CustomDialog>
  );
};

export default TransactionModal;
