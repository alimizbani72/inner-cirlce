import { signalsList } from '../consts';
import { useTranslate } from '@/locales';
import type { SignalType } from '../types';
import type { Dispatch, SetStateAction } from 'react';
import { Box, Typography } from '@mui/material';
import { toTitleCase } from '@/utils/change-case';
import { AutoComplete } from '@/components/AutoComplete';
import Icon from '@/components/icon';

interface SignalAutoCompleteProps {
  setSignals: Dispatch<SetStateAction<SignalType[]>>;
  signals: SignalType[];
}

const SignalAutoComplete = ({ setSignals, signals }: SignalAutoCompleteProps) => {
  const { t } = useTranslate();

  return (
    <AutoComplete
      placeholder={t('coinReportTable.selectSignal')}
      options={signalsList}
      onChange={(val) => setSignals(val)}
      value={signals}
      multiple
      title={t('coinReportTable.signal')}
      fullWidth
      renderValue={(signalVal) => (
        <Box
          key={signalVal.value}
          display="flex"
          alignItems="center"
          gap={0.5}
          borderRadius={0.75}
          border="1.5px solid"
          borderColor="dark.3"
          p={0.5}
        >
          <Typography sx={{ color: signalVal.color }} variant="p2-medium">
            {toTitleCase(signalVal?.label as string)}
          </Typography>
          <Box
            sx={{ cursor: 'pointer', path: { stroke: (theme) => theme.palette.grey.light } }}
            onClick={() =>
              setSignals((prev) => prev.filter((item) => item.value !== signalVal.value))
            }
          >
            <Icon name="CloseIcon" size={16} />
          </Box>
        </Box>
      )}
    />
  );
};

export default SignalAutoComplete;
