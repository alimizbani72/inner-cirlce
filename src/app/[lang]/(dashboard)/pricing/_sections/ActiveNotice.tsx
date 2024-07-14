"use client";

import { Icon } from "@/components/icons";
import CustomDialog from "@/components/CustomDialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useIsMobile } from "@/hooks/use-responsive";
import { LoadingButton } from "@mui/lab";
import {
  useFinancialServiceFinancialPaymentsActiveCancelCreateMutation,
  useFinancialServiceFinancialPaymentsActiveQueryKey,
} from "@minecraft/queries";
import { enqueueSnackbar } from "notistack";
import { getQueryClient } from "@app/_providers/customQueryClient";
type Props = {
  onClose: VoidFunction;
  open: string;
  handlePay: (plan_type: string) => Promise<void>;
  handleOnContinue: () => void;
};

const ActiveNotice: FC<Props> = ({ onClose, open, handlePay, handleOnContinue }) => {
  const isMobile = useIsMobile();
  const { mutateAsync, isPending } = useFinancialServiceFinancialPaymentsActiveCancelCreateMutation();
  const queryClient = getQueryClient();
  const handleNewPayment = async () => {
    try {
      await mutateAsync(undefined, {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: [useFinancialServiceFinancialPaymentsActiveQueryKey] });
        },
      });
      handlePay(open);
    } catch (error) {
      enqueueSnackbar({ message: error?.body?.message, variant: "error" });
    }
  };
  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={onClose} aria-labelledby="withdraw-dialog" open={!!open}>
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ px: 3, textAlign: "center" }} gap={1}>
          <Icon name="Warning--colorful" size={64} />
          <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
            Continue Previous Payment
          </Typography>
          <Typography variant="p2-regular" color={"grey.light"}>
            Would you like to proceed with your previous payment attempt, or start a new payment?
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent={"space-between"}
            gap={2}
            sx={{ width: "100%", mt: 3 }}
          >
            <Button color="secondary" onClick={handleOnContinue}>
              Continue
            </Button>
            <LoadingButton onClick={handleNewPayment} loading={isPending}>
              New Payment
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ActiveNotice;
