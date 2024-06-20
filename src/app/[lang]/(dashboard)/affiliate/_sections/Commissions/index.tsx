"use client";

import { useState, type FC } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import AffCommissionsTabTable from "./Table";
import ContentStack from "@app/_components/ContentStack";
import WithdrawDialog from "@app/_components/WithdrawDialog";
import { useFinancialServiceFinancialInfoQuery } from "@/services/queries";
import { formatCurrency } from "@/utils/toNumber";

const AffCommissionsTab: FC = () => {
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const { data } = useFinancialServiceFinancialInfoQuery();

  return (
    <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
      <ContentStack direction={{ md: "row" }} gap={3}>
        <Stack direction={{ md: "row" }} gap={{ md: 3, xs: 2 }}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{formatCurrency(data?.data?.total_turnover)}</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              Total Turnover
            </Typography>
          </Stack>
          <Divider flexItem orientation="horizontal" sx={{ borderWidth: "1.5px" }} />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{formatCurrency(data?.data?.total_commissions)}</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              Total commission
            </Typography>
          </Stack>
          <Divider flexItem orientation="horizontal" sx={{ borderWidth: "1.5px" }} />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{formatCurrency(data?.data?.available_for_withdraw)}</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              Available for withdraw
            </Typography>
          </Stack>
        </Stack>

        <Button
          sx={{ ml: "auto", width: { md: "auto", xs: "100%" } }}
          color="secondary"
          onClick={() => setOpenWithdrawDialog(true)}
        >
          Withdraw
        </Button>
      </ContentStack>

      <AffCommissionsTabTable />

      <WithdrawDialog open={openWithdrawDialog} close={() => setOpenWithdrawDialog(false)} />
    </Stack>
  );
};

export default AffCommissionsTab;
