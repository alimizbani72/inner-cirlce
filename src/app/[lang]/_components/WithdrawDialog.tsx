"use client";

import { Icon } from "@/components/icons";
import DialogTitle from "@mui/material/DialogTitle";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import {
  useFinancialServiceFinancialInfoQuery,
  useFinancialServiceFinancialInfoQueryKey,
  useFinancialServiceFinancialWithdrawCreateMutation,
  useWalletServiceWalletDefaultQuery,
} from "@minecraft/queries";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useTranslate } from "@/locales";
import { LoadingButton } from "@mui/lab";
import { getQueryClient } from "@app/_providers/customQueryClient";
import useOTP from "@/hooks/useOTP";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const WithdrawDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const { data: walletDefault } = useWalletServiceWalletDefaultQuery();
  const { data: financialInfo } = useFinancialServiceFinancialInfoQuery();
  const { mutateAsync, isPending } = useFinancialServiceFinancialWithdrawCreateMutation();
  const queryClient = getQueryClient();
  const schema = Yup.object().shape({
    amount: Yup.string().required(t("withdraw.requiredAmount")),
    address: Yup.string().required(t("withdraw.requiredWallet")),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { amount: "", address: `${walletDefault?.data?.address || ""}` },
    mode: "onSubmit",
  });
  const { handleSubmit, reset, resetField, watch } = methods;
  const { serviceHandler } = useOTP();

  const onSubmit = handleSubmit((data) => {
    const withdrawFunc = async (otp: string) => {
      try {
        await mutateAsync(
          {
            requestBody: {
              otp,
              //TODO: Fix This , check with backend
              amount: { value: data.amount as any, currency_code: "USD" },
              wallet_id: `${walletDefault?.data?.id}`,
            },
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: [useFinancialServiceFinancialInfoQueryKey] });
              enqueueSnackbar(t("withdraw.submitRequest"));
              close();
              reset();
              resetField("amount");
            },
            onError: (error: any) => {
              enqueueSnackbar(error?.body?.message || t("formErrors.formError"), { variant: "error" });
            },
          }
        );
      } catch (error) {
        enqueueSnackbar(error?.body?.message || t("formErrors.formError"), { variant: "error" });
      }
    };

    serviceHandler(withdrawFunc);
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="withdraw-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="withdraw-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            {t("withdraw.Withdraw")}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{formatCurrency(financialInfo?.data?.available_for_withdraw)}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t("withdraw.availableWithdraw")}
            </Typography>
          </Stack>

          <RHFTextField
            name="amount"
            label={t("withdraw.amount")}
            placeholder={t("withdraw.enterAmount")}
            type="number"
            isMoney
          />
          <RHFTextField
            name="address"
            label={t("withdraw.address")}
            InputProps={{
              readOnly: true,
              // endAdornment: (
              //   <Typography variant="p2-medium" color="pink.dark">
              //     Change
              //   </Typography>
              // ),
            }}
          />
          <Stack component={"ul"} pl={3}>
            <Typography component={"li"} variant="p2-regular" color="grey.light">
              {t("withdraw.feeWithdrawal")}
            </Typography>
            <Typography component={"li"} variant="p2-regular" color="grey.light">
              {t("withdraw.minimumAmount")}
            </Typography>
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button color="info" onClick={close}>
            {t("button.cancel")}
          </Button>
          <LoadingButton
            loading={isPending}
            onClick={onSubmit}
            disabled={!(toNumber(watch("amount")) > 99 && walletDefault?.data?.address)}
          >
            {t("withdraw.Withdraw")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default WithdrawDialog;
