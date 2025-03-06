import RiveComp from '@/components/rive-loader';
import { useTranslate } from '@/locales';
import { toPascalCase } from '@/utils/change-case';
import { toNumber } from '@/utils/toNumber';
import { Box, Divider, Stack, Typography } from '@mui/material';
type Props = {
  type: string | undefined;
  percent: number | undefined;
  goldCoins: number | undefined;

  isNextRank?: boolean;
};
const CurrentandNextRank = ({ type, percent, goldCoins, isNextRank }: Props) => {
  const { t } = useTranslate();

  return (
    <Stack p={3} flex={4 / 12} gap={2} justifyContent={{ md: 'center' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor={isNextRank ? 'dark.3' : 'blue.dark'}
        borderRadius="10px"
        px={2}
        py={1}
      >
        <Typography variant="p1-regular">
          {isNextRank ? t('afDashboardTab.nextRank') : t('afDashboardTab.currentRank')}
        </Typography>
        <Typography variant="p1-semi-bold" color={isNextRank ? 'pink.dark' : 'common.white'}>
          #{toPascalCase(type)}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack alignItems="center" flex={1}>
          <Typography variant="h4-semi-bold" color={isNextRank ? 'success.main' : 'common.white'}>
            {isNextRank && '+'}
            {percent} %
          </Typography>
          <Typography variant="p2-medium" color="grey.light">
            {t('afDashboardTab.overrideBonus')}
          </Typography>
        </Stack>
        <Divider flexItem sx={{ borderWidth: '1px' }} />
        <Stack alignItems="center" flex={1}>
          <Stack direction="row" alignItems="center" position={'relative'}>
            <Box position="absolute" left="-16px" sx={{ aspectRatio: 1 }}>
              <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
            </Box>
            <Typography
              pl={4}
              variant="h4-semi-bold"
              color={isNextRank ? 'success.main' : 'common.white'}
            >
              {isNextRank && '+'}
              {toNumber(goldCoins)}
            </Typography>
          </Stack>
          <Typography variant="p2-medium" color="grey.light">
            {t('afDashboardTab.goldCoins')}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CurrentandNextRank;
