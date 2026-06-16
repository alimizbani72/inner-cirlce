"use client";

import CustomDialog from "@/components/CustomDialog";
import { RHFCode } from "@/components/hook-form";
import FormProvider from "@/components/hook-form/form-provider";
import Icon from "@/components/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, DialogContent, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import zod from "zod";

const UpdateUserSchema = zod.object({
  verifyCode: zod.string().nonempty("The value is wrong, try again."),
});

const defaultValues = {
  verifyCode: "",
};

type FilterDialogProps = {
  open: boolean;
  close: VoidFunction;
};

export default function DisableModal({ open, close }: FilterDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  // 🔹 fake submit (no API)
  const onSubmit = handleSubmit(async () => {
    try {
      setIsLoading(true);

      await new Promise((res) => setTimeout(res, 800));

      toast.success("Your 2FA disabled successfully.");
      close();
    } catch {
      toast.error("Something is wrong! please try again");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <CustomDialog
      fullWidth
      maxWidth="xs"
      onClose={close}
      aria-labelledby="enable-2fa"
      open={open}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack gap={2} justifyContent="center" alignItems="center">
          <Icon name="PasswordIcon" size={64} />

          <Stack gap={1} textAlign="center">
            <Typography variant="h3-semi-bold">
              Are you sure you want to disable 2FA?
            </Typography>

            <Typography variant="p2-regular">
              Enter the Two-factor authentication code to confirm your request.
            </Typography>
          </Stack>

          <FormProvider methods={methods} onSubmit={onSubmit} sx={{ mt: 1 }}>
            <RHFCode
              name="verifyCode"
              label="Authentication Code"
              loading={isLoading}
            />
          </FormProvider>

          <Stack
            direction="row"
            gap={2}
            mt={2}
            width="100%"
            justifyContent="space-between"
          >
            <Button color="tertiary" onClick={close}>
              No, Cancel
            </Button>

            <LoadingButton
              loading={isLoading}
              type="button"
              onClick={onSubmit}
              color="secondary"
            >
              Yes, Disable
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
}
