import RiveComp from "@/components/RiveComp";
import { plans } from "@/configs/plans";
import { useAppRouter } from "@/routes/hooks";
import { useFinancialServiceFinancialPayCreateMutation } from "@minecraft/queries";
import { fCurrency } from "@/utils/format-number";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import type { FC } from "react";

type Props = {
  title: string;
  plan_type: string;
  description: string;
  cost: string;
};

const PlanCard: FC<Props> = ({ title, description, plan_type, cost }) => {
  const { push } = useAppRouter();
  const { mutateAsync, isPending } = useFinancialServiceFinancialPayCreateMutation();

  const handlePay = () => {
    mutateAsync({ requestBody: { plan_type, symbol: "USDC" } })
      .then((response) => {
        push(`/checkout/qr-wallet?plan_type=${plan_type}&id=${response?.data?.id}`);
      })
      .catch((error) => enqueueSnackbar({ message: error.message, variant: "error" }));
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
        <Stack width="100%" height={264} p={4} borderBottom={"1px solid"} borderColor={"dark.3"} alignItems="center">
          <RiveComp src={plans[plan_type as keyof typeof plans]?.rive} width={200} height={200} />
        </Stack>
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
