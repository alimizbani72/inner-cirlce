"use client";

import { Icon } from "@/components/icons";
import DialogTitle from "@mui/material/DialogTitle";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Divider, IconButton, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useWalletServiceWalletCreateMutation } from "@/services/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useTranslate } from "@/locales";
import { LoadingButton } from "@mui/lab";
import { getQueryClient } from "@app/_providers/customQueryClient";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const schema = Yup.object().shape({
  address: Yup.string().required("ERC-20 Wallet address is required"),
  name: Yup.string().required("Name is required"),
});

const defaultValues = {
  address: "",
  name: "",
};

const SetupWalletDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const queryClient = getQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync, isPending } = useWalletServiceWalletCreateMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, reset, resetField } = methods;

  const onSubmit = handleSubmit((data) => {
    mutateAsync({ requestBody: data })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["WalletServiceWalletDefaultQuery"] });
        enqueueSnackbar("Your wallet address has been updated successfully.");
        close();
        reset();
        resetField("name");
        resetField("address");
      })
      .catch(() => enqueueSnackbar(t("formErrors.formError"), { variant: "error" }));
  });

  return (
    <CustomDialog fullWidth maxWidth="sm" onClose={close} aria-labelledby="withdraw-dialog" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="withdraw-dialog">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4-semi-bold" color={"common.white"}>
            Setup Your Wallet
          </Typography>
          <IconButton onClick={close}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
          <RHFTextField name="address" label="ERC-20 Wallet address" placeholder="Enter ERC-20 wallet address" />
          <RHFTextField name="name" label="Your individual pseudonym" placeholder="Enter your individual pseudonym" />
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"}>
          <Button size="large" color="info" onClick={close}>
            Cancel
          </Button>
          <LoadingButton loading={isPending} size="large" onClick={onSubmit}>
            Save Wallet
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default SetupWalletDialog;
