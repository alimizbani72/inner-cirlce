"use client";

import { useState, type FC } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import AffCommissionsTabTable from "./Table";
import ContentStack from "@app/_components/ContentStack";
import WithdrawDialog from "@app/_components/WithdrawDialog";
import { useFinancialServiceFinancialInfoQuery } from "@minecraft/queries";
import { formatCurrency } from "@/utils/toNumber";
import { useTranslate } from "@/locales";
import { enqueueSnackbar } from "notistack";
import { Icon } from "@/components/icons";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const AffCommissionsTab: FC = () => {
  const { t } = useTranslate();
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const { data } = useFinancialServiceFinancialInfoQuery();
  const userInfo = useAppSelector(selectUser);

  const handleWithdrawClick = () => {
    if (userInfo?.suspended) {
      enqueueSnackbar({ message: t("global.suspended"), variant: "error" });
    } else {
      setOpenWithdrawDialog(true);
    }
  };

  return (
    <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
      <ContentStack direction={{ md: "row" }} gap={3}>
        <Stack direction={{ md: "row" }} gap={{ md: 3, xs: 2 }}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{formatCurrency(data?.data?.total_turnover)}</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              {t("affCommissionsTab.totalTurnover")}
            </Typography>
          </Stack>
          <Divider flexItem orientation="horizontal" sx={{ borderWidth: "1.5px" }} />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{formatCurrency(data?.data?.total_commissions)}</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              {t("affCommissionsTab.totalCommission")}
            </Typography>
          </Stack>
          <Divider flexItem orientation="horizontal" sx={{ borderWidth: "1.5px" }} />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{formatCurrency(data?.data?.available_for_withdraw)}</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              {t("affCommissionsTab.availableForWithdraw")}
            </Typography>
          </Stack>
        </Stack>

        <Button
          sx={{
            ml: "auto",
            width: { md: "auto", xs: "100%" },
          }}
          color="secondary"
          onClick={handleWithdrawClick}
          startIcon={!!userInfo?.suspended && <Icon name="Warning" />}
        >
          {t("affCommissionsTab.withdraw")}
        </Button>
      </ContentStack>

      <AffCommissionsTabTable />

      <WithdrawDialog open={openWithdrawDialog} close={() => setOpenWithdrawDialog(false)} />
    </Stack>
  );
};

export default AffCommissionsTab;
