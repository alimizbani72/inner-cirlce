"use client";

import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import useOTP from "@/hooks/useOTP";
import { useTranslate } from "@/locales";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Icon from "./icon";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const WithdrawDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();

  // ✅ DUMMY DATA
  const walletDefault = {
    data: {
      id: "wallet-1",
      address: "TRX-DEMO-ADDRESS-123456",
    },
  };

  const financialInfo = {
    data: {
      available_for_withdraw: {
        value: 2500,
        currency_code: "USD",
      },
    },
  };

  const schema = z.object({
    amount: z.string().nonempty(t("withdraw.requiredAmount")),
    address: z.string().nonempty(t("withdraw.requiredWallet")),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: "",
      address: walletDefault.data.address,
    },
    mode: "onSubmit",
  });

  const { handleSubmit, reset, resetField, watch } = methods;

  const { serviceHandler } = useOTP();

  const onSubmit = handleSubmit(() => {
    const withdrawFunc = async (_otp: string) => {
      try {
        toast.success("Withdraw request submitted (mock)");
        close();
        reset();
        resetField("amount");
      } catch {
        toast.error(t("formErrors.formError"));
      }
    };

    serviceHandler(withdrawFunc);
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} open={open}>
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4-semi-bold">
            {t("withdraw.Withdraw")}
          </Typography>

          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack gap={2}>
            <Stack gap={0.5}>
              <Typography variant="p2-medium">
                {formatCurrency(financialInfo.data.available_for_withdraw)}
              </Typography>
              <Typography variant="caption-medium" color="grey.light">
                {t("withdraw.availableWithdraw")}
              </Typography>
            </Stack>

            <RHFTextField
              name="amount"
              label={t("withdraw.amount")}
              placeholder={t("withdraw.enterAmount")}
              isMoney
            />

            <RHFTextField
              name="address"
              label={t("withdraw.address")}
              slotProps={{
                input: { readOnly: true },
              }}
            />

            <Stack component="ul" pl={3}>
              <Typography
                component="li"
                variant="p2-regular"
                color="grey.light"
              >
                {t("withdraw.feeWithdrawal")}
              </Typography>
              <Typography
                component="li"
                variant="p2-regular"
                color="grey.light"
              >
                {t("withdraw.minimumAmount")}
              </Typography>
            </Stack>
          </Stack>
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" width="100%" justifyContent="space-between">
          <Button color="tertiary" onClick={close}>
            {t("button.cancel")}
          </Button>

          <LoadingButton
            onClick={onSubmit}
            disabled={
              !(toNumber(watch("amount")) > 99 && walletDefault.data.address)
            }
          >
            {t("withdraw.Withdraw")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default WithdrawDialog;
