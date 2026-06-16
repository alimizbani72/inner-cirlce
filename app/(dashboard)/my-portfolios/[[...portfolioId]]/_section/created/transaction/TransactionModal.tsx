"use client";
import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import { useTranslate } from "@/locales";
import { DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Toggle from "@/components/Toggle";
import { Image } from "@/components/image";
import LoadingButton from "@/components/loading-button";
import {
  closeTransactionModal,
  selectActiveSymbol,
  selectIsEditMode,
  selectIsModalOpen,
  selectTransactionToEdit,
} from "@/lib/features/portfolio/transactionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { customInstance } from "@/scripts/fetcher";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import Bullets from "../../Bullets";
import { invalidatePortfolioQueries } from "../../InvaidatePorfolioQueries";
import { getActivePortfolioId, parseToNumber } from "../../utils";
import CoinsList from "./CoinsList";
import DateInput from "./DateInput";
import FeeTooltip from "./FeeTooltip";
import PriceInput from "./PriceInput";
import Total from "./Total";
const useGetCoinsSlugPrice = (slug?: string, options?: any) => {
  return useQuery({
    queryKey: ["coin-price", slug],
    queryFn: async () => {
      return customInstance({
        url: `/coins/${slug}/price`,
      });
    },
    enabled: options?.query?.enabled ?? !!slug,
  });
};

const usePostPortfolioTransactions = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return customInstance({
        url: `/portfolio-transactions`,
        method: "POST",
        data: payload.data,
      });
    },
  });
};
const usePutPortfolioTransactionsId = () => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return customInstance({
        url: `/portfolio-transactions/${payload.id}`,
        method: "PUT",
        data: payload.data,
      });
    },
  });
};
const formSchema = z.object({
  coins: z.any().nullable(),
  quantity: z.number(),
  price: z.number().optional(),
  fee: z.number().optional(),
  note: z.string().optional(),
});
const TransactionModal = () => {
  const { t } = useTranslate();
  const buttons = [
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
  ];

  const { portfolioId } = useParams();
  const isEditMode = useAppSelector(selectIsEditMode);
  const queryClient = useQueryClient();
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const transactionToEdit = useAppSelector(selectTransactionToEdit);
  const initialDate =
    isEditMode && transactionToEdit ? dayjs(transactionToEdit.date) : null;
  const [dateTime, setDateTime] = useState<Dayjs | null>(initialDate);
  const [btnValue, setBtnValue] = useState<number>(
    isEditMode && transactionToEdit?.type === "sell" ? 2 : 1,
  );

  const { mutateAsync: createTransaction, isPending: createIsPending } =
    usePostPortfolioTransactions();
  const { mutateAsync: updateTransaction, isPending: updateIsPending } =
    usePutPortfolioTransactionsId();

  const defaultValues = {
    coins: transactionToEdit ? transactionToEdit.symbol : null,
    quantity: transactionToEdit ? +transactionToEdit.quantity : "",
    price: transactionToEdit ? +transactionToEdit.price : "",
    fee: transactionToEdit ? +transactionToEdit.fee : undefined,
    note: transactionToEdit ? transactionToEdit.note : "",
  };

  const methods = useForm({
    resolver: zodResolver(formSchema),
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

  const { data: perCoinPrice } = useGetCoinsSlugPrice(selectedCoinSymbol, {
    query: {
      enabled: !!selectedCoinSymbol,
    },
  });

  const activePortfolioId = getActivePortfolioId(portfolioId);

  const onSubmit = handleSubmit(async (data) => {
    const formattedDate = dateTime
      ? dayjs(dateTime).format("YYYY-MM-DD")
      : undefined;
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
          data: requestBody as any,
          id: transactionToEdit.id as any,
        });
      } else {
        await createTransaction({
          data: requestBody as any,
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

      toast.error(errorMessage);
    }
  });
  // const isSubmitDisabled = !dateTime || quantity === 0;

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={() => dispatch(closeTransactionModal())}
      aria-labelledby="Transaction-dialog"
      open={isModalOpen}
      title={
        isEditMode
          ? t("portfolioTransaction.updateTransaction")
          : t("portfolioTransaction.addTransaction")
      }
    >
      <DialogContent sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
          <Toggle
            size="large"
            setValue={handleButtonChange}
            buttons={buttons}
            value={btnValue}
            width="100%"
          />
          {isEditMode ? (
            <Stack
              direction={"row"}
              p={2}
              spacing={1}
              sx={{
                border: "2px solid",
                borderColor: "dark.3",
                borderRadius: 1.5,
                width: "100%",
              }}
            >
              <Image
                src={transactionToEdit?.logo}
                style={{ width: "24px", height: "24px" }}
              />
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
              perCoinPrice={perCoinPrice}
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <DateInput
              onConfirm={(dateTime) => setDateTime(dateTime)}
              initialDate={dateTime}
            />
            <Stack spacing={0.5} width={"100%"}>
              <FeeTooltip />
              <RHFTextField
                name="fee"
                placeholder={t("portfolioTransaction.enterTheFee")}
                type="number"
                isMoney
              />
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

      <DialogActions>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack>
            <Total
              btnValue={btnValue}
              fee={fee}
              price={price}
              quantity={quantity}
            />
          </Stack>
          <LoadingButton
            onClick={onSubmit}
            size="large"
            disabled={true}
            loading={createIsPending || updateIsPending}
          >
            {isEditMode
              ? t("portfolioTransaction.updateTransaction")
              : t("portfolioTransaction.addTransaction")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TransactionModal;
