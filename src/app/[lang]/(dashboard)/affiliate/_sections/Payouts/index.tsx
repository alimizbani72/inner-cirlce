"use client";

import type { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import AffPayoutsTabTable from "./Table";
import ContentStack from "@app/_components/ContentStack";
import { Icon } from "@/components/icons";

const AffPayoutsTab: FC = () => {
  return (
    <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
      <ContentStack direction={{ md: "row" }} gap={3}>
        <Stack gap={2} direction={"row"} alignItems={"center"}>
          <Icon name="Wallet--colorful" size={32} />
          <Typography variant="p1-medium" sx={{ wordBreak: "break-word" }}>
            ERC-20 : 00kkjioo9090......1290ghyjhbbnjhhu
          </Typography>
        </Stack>

        <Button sx={{ ml: "auto", width: { md: "auto", xs: "100%" } }} color="info" startIcon={<Icon name="Wallet" />}>
          Change Wallet
        </Button>
      </ContentStack>

      <AffPayoutsTabTable />
    </Stack>
  );
};

export default AffPayoutsTab;
