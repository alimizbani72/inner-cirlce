"use client";

import CustomDialog from "@/components/CustomDialog";
import Icon from "@/components/icon";
import LoadingButton from "@/components/loading-button";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { Button, Stack, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import type { FC } from "react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  onClose: VoidFunction;
  open: string;
  handlePay: (plan_type: string) => void;
  handleOnContinue: () => void;
};

const ActiveNotice: FC<Props> = ({
  onClose,
  open,
  handlePay,
  handleOnContinue,
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();

  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Fake API call
  const fakeCancelPayment = () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });

  const handleNewPayment = async () => {
    try {
      setIsLoading(true);

      await fakeCancelPayment(); // simulate API

      // optional success message
      toast.success("Previous payment cancelled");

      handlePay(open);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomDialog
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      aria-labelledby="withdraw-dialog"
      open={!!open}
    >
      <DialogContent dividers sx={{ p: 3 }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ px: 3, textAlign: "center" }}
          gap={1}
        >
          <Icon name="WarningIcon" size={64} stroke="warning.main" />

          <Typography variant="h3-semi-bold" sx={{ mt: 1 }}>
            {t("pricing.continuePreviousPayment")}
          </Typography>

          <Typography variant="p2-regular" color="grey.light">
            {t("pricing.wouldYouLikeToProceed")}
          </Typography>

          <Stack
            direction={isMobile ? "column" : "row"}
            justifyContent="space-between"
            gap={2}
            sx={{ width: "100%", mt: 3 }}
          >
            <Button color="secondary" onClick={handleOnContinue}>
              {t("pricing.continue")}
            </Button>

            <LoadingButton onClick={handleNewPayment} loading={isLoading}>
              {t("pricing.newPayment")}
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
};

export default ActiveNotice;
