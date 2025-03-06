import LoadingButton from '@/components/loading-button';
import RiveComp from '@/components/rive-loader';
import { plans } from '@/configs/plans';
import { fCurrency } from '@/utils/format-number';
import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';

type Props = {
  title: string;
  plan_type: string;
  description: string;
  cost: string;
  buttonText: string;
  disabled?: boolean;
  handlePayment: (plan_type: string) => Promise<void>;
  isPending?: boolean;
  watchText?: string;
};

const PlanCard: FC<Props> = ({
  title,
  description,
  plan_type,
  cost,
  disabled,
  buttonText,
  handlePayment,
  isPending,
}) => {
  return (
    <Stack
      height={520}
      width={212}
      minWidth={212}
      maxWidth={212}
      flex={1}
      border={'1px solid'}
      borderColor={'dark.3'}
      bgcolor={'dark.2'}
      borderRadius={2}
    >
      <Stack
        width="100%"
        height={264}
        p={4}
        borderBottom={'1px solid'}
        borderColor={'dark.3'}
        alignItems="center"
      >
        {plans[plan_type as keyof typeof plans]?.rive && (
          <RiveComp src={plans[plan_type as keyof typeof plans]?.rive} width={200} height={200} />
        )}
      </Stack>

      <Stack p={2} gap={2}>
        <Typography mb={-1} variant="p1-semi-bold" color="pink.light">
          {title}
        </Typography>
        <Typography variant="p2-medium">{description}</Typography>
        <Typography variant="h3-semi-bold">{fCurrency(cost)}</Typography>
        <LoadingButton
          loading={isPending}
          onClick={() => handlePayment(plan_type)}
          disabled={disabled}
        >
          {buttonText}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default PlanCard;
