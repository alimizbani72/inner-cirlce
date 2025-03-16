'use client';
import CustomTooltip from '@/components/CustomTooltip';
import { useTranslate } from '@/locales';
import { Stack, Typography } from '@mui/material';

const FeeTooltip = () => {
  const { t } = useTranslate();

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <Typography variant="caption-semi-bold">{t('portfolioTransaction.fee')}</Typography>
      <CustomTooltip
        title={t('portfolioTransaction.topFeeHelpText')}
        sx={{
          bgcolor: 'dark.3',
          px: 1.25,
          maxWidth: 24,
          borderRadius: '50%',
          color: 'white',
        }}
      >
        <Typography variant="caption-semi-bold">!</Typography>
      </CustomTooltip>
    </Stack>
  );
};

export default FeeTooltip;
