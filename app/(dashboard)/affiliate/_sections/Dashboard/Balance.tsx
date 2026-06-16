"use client";
import WithdrawDialog from "@/components/WithdrawDialog";
import Icon from "@/components/icon";
import { getUserPlanType } from "@/consts";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import { formatCurrency } from "@/utils/toNumber";
import EnableModal from "@app-components/2FA/EnableModal";
import ContentStack from "@app-components/ContentStack";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import TwoFAAlertDialog from "../TwoFAAlertDialog";

const Balance = () => {
  const { t } = useTranslate();
  const { data: userInfo } = useGetMe();
  const isLoading = false;
  const balance = {
    data: {
      available_for_withdraw: {
        value: 7200,
        currency_code: "USD",
      },
    },
  };
  const isFreePlan = getUserPlanType(userInfo?.data) === "plankton";
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const [open2faAlert, setOpen2faAlert] = useState(false);
  const [openEnable2FA, setOpenEnable2FA] = useState(false);
  const handleWithdrawClick = () => {
    if (userInfo?.data?.suspended) {
      toast.error(t("global.suspended"));
    } else if (!userInfo?.data?.has_2fa) {
      setOpen2faAlert(true);
    } else {
      setOpenWithdrawDialog(true);
    }
  };
  return (
    <>
      <ContentStack
        direction={{ md: "row" }}
        gap={3}
        flex={1}
        height={{ md: "106px", xs: "170px" }}
        alignItems={{ md: "center" }}
        className={isLoading ? "loading-skeleton" : ""}
      >
        {balance?.data?.available_for_withdraw && (
          <>
            <Stack direction="row" gap={2}>
              <Stack
                p={2}
                bgcolor="dark.3"
                width={56}
                height={56}
                borderRadius="28px"
              >
                {/* Todo color full  */}
                <Icon name="MoneyfillIcon" />
              </Stack>
              <Stack>
                <Typography variant="h4-semi-bold">
                  {formatCurrency(balance?.data?.available_for_withdraw)}
                </Typography>
                <Typography variant="p2-medium" color="grey.light">
                  {t("afDashboardTab.commissionWallet")}
                </Typography>
              </Stack>
            </Stack>
            <Button
              sx={{ ml: "auto", width: { md: "auto", xs: "100%" } }}
              color="secondary"
              onClick={handleWithdrawClick}
              startIcon={
                !!userInfo?.data?.suspended && <Icon name="WarningIcon" />
              }
              disabled={isFreePlan}
            >
              {t("afDashboardTab.withdraw")}
            </Button>
          </>
        )}
      </ContentStack>
      {openWithdrawDialog && (
        <WithdrawDialog
          open={openWithdrawDialog}
          close={() => setOpenWithdrawDialog(false)}
        />
      )}
      {openEnable2FA && (
        <EnableModal
          open={openEnable2FA}
          close={() => setOpenEnable2FA(false)}
        />
      )}
      {open2faAlert && (
        <TwoFAAlertDialog
          open={open2faAlert}
          close={() => setOpen2faAlert(false)}
          onSubmit={() => {
            setOpen2faAlert(false);
            setOpenEnable2FA(true);
          }}
        />
      )}
    </>
  );
};

export default Balance;
