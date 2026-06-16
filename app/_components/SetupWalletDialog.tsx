"use client";

import CustomDialog from "@/components/CustomDialog";
import { RHFTextField } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { useTranslate } from "@/locales";
import { zodResolver } from "@hookform/resolvers/zod";
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
// removed: getQueryClient
// removed: usePostWallet
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const defaultValues = {
  address: "",
  name: "",
};

const SetupWalletDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();

  // dummy replacements

  const mutateAsync = async (_data: any) => {
    return Promise.resolve();
  };

  const isPending = false;

  const schema = z.object({
    address: z.string().nonempty(t("wallet.requiredAddress")),
    name: z.string().nonempty(t("wallet.requiredName")),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit, reset, resetField } = methods;

  const onSubmit = handleSubmit((data) => {
    mutateAsync({ data })
      .then(() => {
        toast.success(t("wallet.successMessage"));
        close();
        reset();
        resetField("name");
        resetField("address");
      })
      .catch(() => toast.error(t("formErrors.formError")));
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      aria-labelledby="withdraw-dialog"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="withdraw-dialog">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4-semi-bold" color="common.white">
            {t("wallet.setupWallet")}
          </Typography>
          <IconButton onClick={close}>
            <Icon name="CloseIcon" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
          <RHFTextField
            name="address"
            label={t("wallet.addressInputLabel")}
            placeholder={t("wallet.addressInputPlaceholder")}
          />
          <RHFTextField
            name="name"
            label={t("wallet.nameInputLabel")}
            placeholder={t("wallet.nameInputPlaceholder")}
          />
        </FormProvider>
      </DialogContent>

      <DialogActions>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Button size="large" color="tertiary" onClick={close}>
            {t("button.cancel")}
          </Button>
          <LoadingButton loading={isPending} size="large" onClick={onSubmit}>
            {t("wallet.saveButton")}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default SetupWalletDialog;
