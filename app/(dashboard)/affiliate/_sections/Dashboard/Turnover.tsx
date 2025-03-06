'use client';

import Icon from '@/components/icon';
import { useTranslate } from '@/locales';
import { useGetAffiliateMe } from '@/services/minecraft/affiliate/affiliate';
import { formatCurrency } from '@/utils/toNumber';
import ContentStack from '@app-components/ContentStack';
import { Stack, Typography } from '@mui/material';

const Turnover = () => {
  const { t } = useTranslate();
  const { data: me, isLoading } = useGetAffiliateMe();
  return (
    <ContentStack
      direction="row"
      height={'106px'}
      gap={2}
      flex={1}
      alignItems={{ md: 'center' }}
      className={isLoading ? 'loading-skeleton' : ''}
    >
      {me?.data?.turnover && (
        <>
          <Stack p={2} bgcolor="dark.3" width={56} height={56} borderRadius="28px">
            <Icon name="MoneyfillIcon" />
          </Stack>
          <Stack>
            <Typography variant="h4-semi-bold">{formatCurrency(me?.data?.turnover)}</Typography>
            <Typography variant="p2-medium" color="grey.light">
              {t('afDashboardTab.totalTurnover')}
            </Typography>
          </Stack>
        </>
      )}
    </ContentStack>
  );
};

export default Turnover;
