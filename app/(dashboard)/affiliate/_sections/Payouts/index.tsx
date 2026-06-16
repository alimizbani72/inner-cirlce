"use client";

import { useTranslate } from "@/locales";
import { Button, Stack, Typography } from "@mui/material";
import { type FC, useState } from "react";
import AffPayoutsTabTable from "./Table";

import Icon from "@/components/icon";
import ContentStack from "@app-components/ContentStack";
import SetupWalletDialog from "@app-components/SetupWalletDialog";

const AffPayoutsTab: FC = () => {
  const { t } = useTranslate();

  // dummy replacement for useGetWalletDefault
  const isFetching = false;

  const [openSetupWalletDialog, setOpenSetupWalletDialog] = useState(false);

  return (
    <>
      <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3} maxWidth={"100vw"}>
        <ContentStack direction={{ md: "row" }} gap={3}>
          <Stack gap={2} direction={"row"} alignItems={"center"}>
            {/* Todo --colorful icon  */}
            <Icon name="WalletIcon" size={32} />
            <Typography
              variant="p1-medium"
              sx={{ wordBreak: "break-word" }}
              className={isFetching ? "loading-skeleton" : ""}
              minWidth={250}
              minHeight={28}
            >
              {!isFetching && t("affPayoutsTab.setupWalletMessage")}
            </Typography>
          </Stack>

          <Button
            sx={{ ml: "auto", width: { md: "auto", xs: "100%" } }}
            color="tertiary"
            startIcon={<Icon name="WalletIcon" />}
            onClick={() => setOpenSetupWalletDialog(true)}
          >
            {t("affPayoutsTab.setupWallet")}
          </Button>
        </ContentStack>
      </Stack>

      <AffPayoutsTabTable />

      {openSetupWalletDialog && (
        <SetupWalletDialog
          open={openSetupWalletDialog}
          close={() => setOpenSetupWalletDialog(false)}
        />
      )}
    </>
  );
};

export default AffPayoutsTab;
