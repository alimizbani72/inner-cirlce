import { useIsMobile } from "@/hooks/use-responsive";
import { selectUser } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import { useTranslate } from "@/locales";
import ContentStack from "@app/_components/ContentStack";
import { Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface AccountInfoProps {}

const AccountInfo: FC<AccountInfoProps> = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const userInfo = useAppSelector(selectUser);

  return (
    <ContentStack gap={2}>
      <Stack direction={{ md: "row" }} gap={3}>
        <Stack flex={1} gap={0.5}>
          <Typography variant="p2-medium">{userInfo?.business_info?.holder_name || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            {t("businessaccount.accountholdername")}
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack flex={1} gap={0.5}>
          <Typography variant="p2-medium">{userInfo?.business_info?.company_name || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            {t("businessaccount.companyname")}
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack flex={1} gap={0.5}>
          <Typography variant="p2-medium">{userInfo?.business_info?.email || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            Email
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack flex={1} gap={0.5}>
          <Typography variant="p2-medium">{userInfo?.business_info?.registration_number || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            {t("businessaccount.Companyregistrationnumber")}
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack flex={1} gap={0.5}>
          <Typography variant="p2-medium">{userInfo?.business_info?.vat_number || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            VAT number
          </Typography>
        </Stack>
      </Stack>
      <Divider flexItem />

      <Stack direction={{ md: "row" }} gap={3}>
        <Stack flex={1} gap={0.5}>
          <Typography variant="p2-medium">{userInfo?.business_info?.country || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            {t("billinghistory.country")}
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack flex={2} direction="row" gap={3}>
          <Stack flex={1} mr={{ md: "unset", xs: "auto" }} gap={0.5}>
            <Typography variant="p2-medium">{userInfo?.business_info?.city || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t("billinghistory.city")}
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack flex={1} mr={{ md: "unset", xs: "auto" }} gap={0.5}>
            <Typography variant="p2-medium">{userInfo?.business_info?.zip_code || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              {t("billinghistory.zipCode")}
            </Typography>
          </Stack>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack flex={2} gap={0.5}>
          <Typography variant="p2-medium">{userInfo?.business_info?.address || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            {t("billinghistory.address")}
          </Typography>
        </Stack>
      </Stack>
    </ContentStack>
  );
};

export default AccountInfo;
