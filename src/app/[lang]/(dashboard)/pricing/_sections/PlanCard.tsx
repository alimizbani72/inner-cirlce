import RiveComp from "@/components/RiveComp";
import { plans } from "@/configs/plans";
import { useFinancialServiceFinancialPayCreateMutation } from "@/services/queries";
import { fCurrency } from "@/utils/format-number";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

type Props = {
  title: string;
  plan_type: string;
  description: string;
  cost: string;
};

const PlanCard: FC<Props> = ({ title, description, plan_type, cost }) => {
  const { mutateAsync, isPending } = useFinancialServiceFinancialPayCreateMutation();

  const handlePay = () => {
    mutateAsync({ requestBody: { plan_type, symbol: "USDC" } });
  };

  return (
    <Stack
      height={500}
      minWidth={264}
      flex={1}
      border={"1px solid"}
      borderColor={"dark.3"}
      bgcolor={"dark.2"}
      borderRadius={2}
    >
      {plans[plan_type as keyof typeof plans]?.rive && (
        <Box width={264} height={264} p={4} borderBottom={"1px solid"} borderColor={"dark.3"}>
          <RiveComp src={plans[plan_type as keyof typeof plans]?.rive} width={200} height={200} />
        </Box>
      )}
      <Stack p={2} gap={2}>
        <Typography mb={-1} variant="p1-semi-bold" color="pink.light">
          {title}
        </Typography>
        <Typography variant="p2-medium">{description}</Typography>
        <Typography variant="h3-semi-bold">{fCurrency(cost, "$0,0[.]00")?.replace("$", "€")}</Typography>
        <LoadingButton loading={isPending} onClick={handlePay}>
          Choose Plan
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default PlanCard;
