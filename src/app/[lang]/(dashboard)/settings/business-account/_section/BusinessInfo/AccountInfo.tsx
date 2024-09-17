import { useIsMobile } from "@/hooks/use-responsive";
import ContentStack from "@app/_components/ContentStack";
import { Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface AccountInfoProps {}

const accountInfo = {
  name: "Mike Tyson",
  company_name: "MBA",
  email: "Tyson@example.com",
  company_number: "08234567",
  vat_number: "GB 123 4567 89",
  country: "United Kingdom",
  city: "London",
  zip_code: "SW1A 1AA",
  address: "123 Baker Street, London, W1U 7GB, United Kingdom",
};

const AccountInfo: FC<AccountInfoProps> = () => {
  const isMobile = useIsMobile();

  return (
    <ContentStack gap={2}>
      <Stack direction={{ md: "row" }} gap={3}>
        <Stack gap={0.5}>
          <Typography variant="p2-medium">{accountInfo.name || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            Account holder name
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack gap={0.5}>
          <Typography variant="p2-medium">{accountInfo.company_name || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            Company name
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack gap={0.5}>
          <Typography variant="p2-medium">{accountInfo.email || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            Email
          </Typography>
        </Stack>

        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack gap={0.5}>
          <Typography variant="p2-medium">{accountInfo.company_number || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            Company registration number
          </Typography>
        </Stack>
      </Stack>
      <Divider flexItem />

      <Stack direction={{ md: "row" }} gap={3}>
        <Stack gap={0.5}>
          <Typography variant="p2-medium">{accountInfo.country || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            Country
          </Typography>
        </Stack>
        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack direction="row" gap={3}>
          <Stack mr={{ md: "unset", xs: "auto" }} gap={0.5}>
            <Typography variant="p2-medium">{accountInfo.city || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              City
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack mr={{ md: "unset", xs: "auto" }} gap={0.5}>
            <Typography variant="p2-medium">{accountInfo.zip_code || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              Zip Code
            </Typography>
          </Stack>
        </Stack>

        <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
        <Stack gap={0.5}>
          <Typography variant="p2-medium">{accountInfo.address || "---"}</Typography>
          <Typography variant="caption-medium" color="grey.light">
            Address
          </Typography>
        </Stack>
      </Stack>
    </ContentStack>
  );
};

export default AccountInfo;
