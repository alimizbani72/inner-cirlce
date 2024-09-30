"use client";
import { Stack, Typography } from "@mui/material";
import RequestCard from "./RequestCard";
import BusinessInfo from "./BusinessInfo";
import { useAppSelector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/user/userSlice";

const BusinessAccountSection = () => {
  const userInfo = useAppSelector(selectUser);

  return (
    <Stack justifyContent="center" alignItems="center" p={{ md: 4, xs: 3 }} gap={{ md: 4, xs: 3 }}>
      <Stack width={1} justifyContent="center">
        <Typography variant="p1-medium" color="white">
          Business Account
        </Typography>
      </Stack>

      {userInfo?.business_info ? <BusinessInfo /> : <RequestCard />}
    </Stack>
  );
};

export default BusinessAccountSection;
