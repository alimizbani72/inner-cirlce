"use client";

import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useTranslate } from "@/locales";
import { Icon } from "@/components/icons";
import FormProvider from "@/components/hook-form/form-provider";
import { RHFCode } from "@/components/hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { twoFASubmitterOTPSet } from "@/lib/features/two-fa-submitter/twoFASubmitterSlice";
import { useAppDispatch } from "@/lib/hooks";

type Props = {
  close: VoidFunction;
  open: boolean;
};

const FormSchema = Yup.object().shape({
  verifyCode: Yup.string().required("The value is wrong, try again."),
});

const defaultValues = {
  verifyCode: "",
};

const TwoFASubmitterDialog: FC<Props> = ({ close, open }) => {
  const { t } = useTranslate();
  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;
  const onSubmit = handleSubmit((data) => {
    dispatch(twoFASubmitterOTPSet(data.verifyCode));
  });

  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="two-fa-submitter-dialog" open={open}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack alignItems="center">
          <Icon name="Password--colorful" size={64} />
          <Typography mt={2} variant="h3-semi-bold">
            Please enter 2FA code
          </Typography>

          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
            <RHFCode name="verifyCode" label="Authentication Code" />
          </FormProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack width={"100%"} direction={"row"} justifyContent={"space-between"} gap={2}>
          <Button size="large" fullWidth color="info" onClick={close}>
            {t("button.cancel")}
          </Button>
          <Button size="large" fullWidth onClick={onSubmit}>
            {t("button.verify")}
          </Button>
        </Stack>
      </DialogActions>
    </CustomDialog>
  );
};

export default TwoFASubmitterDialog;
