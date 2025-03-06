import { Typography } from '@mui/material';
export enum riskLevelColor {
  High = '#FF5757',
  Mid = '#F4A305',
  Low = '#00B171',
}
interface RiskLevelHandlerProps {
  value: string;
}

const RiskLevelHandler = ({ value }: RiskLevelHandlerProps) => (
  <Typography
    variant="p2-medium"
    color={riskLevelColor[value?.toString()?.replace(' Risk', '') as keyof typeof riskLevelColor]}
  >
    {value}
  </Typography>
);
export default RiskLevelHandler;
