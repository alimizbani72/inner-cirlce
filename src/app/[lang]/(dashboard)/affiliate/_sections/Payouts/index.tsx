"use client";

import { useState, type FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import AffPayoutsTabTable from "./Table";
import ContentStack from "@app/_components/ContentStack";
import { Icon } from "@/components/icons";
import { useWalletServiceWalletDefaultQuery } from "@/services/queries";
import SetupWalletDialog from "@app/_components/SetupWalletDialog";

const AffPayoutsTab: FC = () => {
  const { data } = useWalletServiceWalletDefaultQuery();
  const [openSetupWalletDialog, setOpenSetupWalletDialog] = useState(false);

  return (
    <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
      <ContentStack direction={{ md: "row" }} gap={3}>
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <Icon name="Wallet--colorful" size={32} />
          <Typography variant="p1-medium" sx={{ wordBreak: "break-word" }}>
            {data?.data ? `ERC-20 : ${data?.data.address}` : "Setup your wallet to we can send the money for you."}
          </Typography>
        </Stack>

        <Button
          sx={{ ml: "auto", width: { md: "auto", xs: "100%" } }}
          color="info"
          startIcon={<Icon name="Wallet" />}
          onClick={() => setOpenSetupWalletDialog(true)}
        >
          {data?.data ? "Change Wallet" : "Setup Wallet"}
        </Button>
      </ContentStack>

      <AffPayoutsTabTable />

      <SetupWalletDialog open={openSetupWalletDialog} close={() => setOpenSetupWalletDialog(false)} />
    </Stack>
  );
};

export default AffPayoutsTab;
