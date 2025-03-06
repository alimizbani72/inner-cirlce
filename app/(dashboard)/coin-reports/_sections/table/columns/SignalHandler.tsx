import { Typography } from '@mui/material';
import { signalsList } from '../../consts';

interface SignalHandlerProps {
  value: string;
}

const SignalHandler = ({ value }: SignalHandlerProps) => {
  const currentSignal = signalsList.find((signal) => signal.value === value);
  return (
    <Typography variant="p2-medium" color={currentSignal?.color}>
      {currentSignal?.label}
    </Typography>
  );
};

export default SignalHandler;
