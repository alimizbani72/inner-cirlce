"use client";

import { useGetAffiliateMe } from "@/services/minecraft/default/default";
import { Stack } from "@mui/material";
import { type FC, useLayoutEffect, useState } from "react";
import TACDialog from "../TACDialog";
import Balance from "./Balance";
import Plans from "./Plans";
import TeamMemberAndVolume from "./TeaamMemberAndValume";
import Turnover from "./Turnover";
import RankSection from "./rank";

const AFDashboardTab: FC = () => {
  const { data: me, isSuccess } = useGetAffiliateMe();
  const [openTACDialog, setOpenTACDialog] = useState(false);
  useLayoutEffect(() => {
    if (isSuccess) {
      setOpenTACDialog(!me?.data?.agreed_to_tos);
    }
  }, [me?.data?.agreed_to_tos, isSuccess]);

  return (
    <>
      <Stack p={{ md: 4, xs: 3 }} pt={{ md: 3 }} gap={3}>
        <Stack direction={{ md: "row" }} gap={3}>
          <Turnover />
          <Balance />
        </Stack>
        <RankSection />
        <Stack direction={{ md: "row" }} gap={3}>
          <TeamMemberAndVolume />
          <Plans />
        </Stack>
      </Stack>

      {openTACDialog && (
        <TACDialog
          open={openTACDialog}
          close={() => {
            setOpenTACDialog(false);
          }}
        />
      )}
    </>
  );
};

export default AFDashboardTab;
