"use client";
import { Button, Stack, Typography } from "@mui/material";
import RequestCard from "./RequestCard";
import BusinessInfo from "./BusinessInfo";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";
import { useState } from "react";
import { Icon } from "@/components/icons";
import BusinessAccountDialog from "./BusinessAccountDialog";

const BusinessAccountSection = () => {
  const userInfo = useAppSelector(selectUser);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
        <Stack width={1} gap={2} justifyContent="space-between" alignItems={{ md: "center" }} direction={{ md: "row" }}>
          <Typography variant="p1-medium" color="white">
            Business Account
          </Typography>

          <Button size="large" color="info" startIcon={<Icon name="Pen" />} onClick={() => setOpenDialog(true)}>
            Change Info
          </Button>
        </Stack>

        {userInfo?.business_info ? <BusinessInfo /> : <RequestCard />}
      </Stack>

      {openDialog && <BusinessAccountDialog open={openDialog} close={() => setOpenDialog(false)} />}
    </>
  );
};

export default BusinessAccountSection;
