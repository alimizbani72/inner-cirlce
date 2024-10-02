import { useIsMobile } from "@/hooks/use-responsive";
import ContentStack from "@app/_components/ContentStack";
import { Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useFinancialServiceBillingAddressQuery } from "@minecraft/queries";

interface BillingInfoProps {}

const BillingInfo: FC<BillingInfoProps> = () => {
  const isMobile = useIsMobile();
  const { data } = useFinancialServiceBillingAddressQuery();

  return (
    <>
      <ContentStack direction={{ md: "row" }} gap={3} justifyContent="space-between">
        <Stack direction={{ md: "row" }} gap={3}>
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.first_name || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              First name
            </Typography>
          </Stack>
          <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.last_name || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              Last name
            </Typography>
          </Stack>
          <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.country || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              Country
            </Typography>
          </Stack>
          <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
          <Stack direction="row" gap={3}>
            <Stack mr={{ md: "unset", xs: "auto" }} gap={0.5}>
              <Typography variant="p2-medium">{data?.data?.city || "---"}</Typography>
              <Typography variant="caption-medium" color="grey.light">
                City
              </Typography>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack mr={{ md: "unset", xs: "auto" }} gap={0.5}>
              <Typography variant="p2-medium">{data?.data?.zipcode || "---"}</Typography>
              <Typography variant="caption-medium" color="grey.light">
                Zip Code
              </Typography>
            </Stack>
          </Stack>

          <Divider orientation={isMobile ? "horizontal" : "vertical"} flexItem />
          <Stack gap={0.5}>
            <Typography variant="p2-medium">{data?.data?.address || "---"}</Typography>
            <Typography variant="caption-medium" color="grey.light">
              Address
            </Typography>
          </Stack>
        </Stack>
      </ContentStack>
    </>
  );
};

export default BillingInfo;
