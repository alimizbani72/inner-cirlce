"use client";

import type { FC } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import AffCommissionsTabTable from "./Table";
import ContentStack from "@app/_components/ContentStack";

const AffCommissionsTab: FC = () => {
  return (
    <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
      <ContentStack direction={{ md: "row" }} gap={3}>
        <Stack direction={{ md: "row" }} gap={{ md: 3, xs: 2 }}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">$8,500.00</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              Total Turnover
            </Typography>
          </Stack>
          <Divider flexItem orientation="horizontal" sx={{ borderWidth: "1.5px" }} />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">$4,280.00</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              Total commission
            </Typography>
          </Stack>
          <Divider flexItem orientation="horizontal" sx={{ borderWidth: "1.5px" }} />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">$4,180.00</Typography>
            <Typography variant="caption-medium" color={"grey.light"}>
              Available for withdraw
            </Typography>
          </Stack>
        </Stack>

        <Button sx={{ ml: "auto", width: { md: "auto", xs: "100%" } }} color="secondary">
          Withdraw
        </Button>
      </ContentStack>

      <AffCommissionsTabTable />
    </Stack>
  );
};

export default AffCommissionsTab;
