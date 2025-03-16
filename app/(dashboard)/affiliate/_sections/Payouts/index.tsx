'use client';

import { useState, type FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import AffPayoutsTabTable from './Table';
import { useTranslate } from '@/locales';
import { useGetWalletDefault } from '@/services/minecraft/wallet/wallet';
import ContentStack from '@app-components/ContentStack';
import Icon from '@/components/icon';
import SetupWalletDialog from '@app-components/SetupWalletDialog';

const AffPayoutsTab: FC = () => {
  const { t } = useTranslate();
  const { data, isFetching } = useGetWalletDefault();
  const [openSetupWalletDialog, setOpenSetupWalletDialog] = useState(false);

  return (
    <>
      <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3} maxWidth={'100vw'}>
        <ContentStack direction={{ md: 'row' }} gap={3}>
          <Stack gap={2} direction={'row'} alignItems={'center'}>
            {/* Todo --colorful icon  */}
            <Icon name="WalletIcon" size={32} />
            <Typography
              variant="p1-medium"
              sx={{ wordBreak: 'break-word' }}
              className={isFetching ? 'loading-skeleton' : ''}
              minWidth={250}
              minHeight={28}
            >
              {!isFetching &&
                (data?.data
                  ? `USDC Polygon (Matic) : ${data?.data.address}`
                  : t('affPayoutsTab.setupWalletMessage'))}
            </Typography>
          </Stack>

          <Button
            sx={{ ml: 'auto', width: { md: 'auto', xs: '100%' } }}
            color="tertiary"
            startIcon={<Icon name="WalletIcon" />}
            onClick={() => setOpenSetupWalletDialog(true)}
          >
            {data?.data ? t('affPayoutsTab.changeWallet') : t('affPayoutsTab.setupWallet')}
          </Button>
        </ContentStack>
      </Stack>
      <AffPayoutsTabTable />
      {openSetupWalletDialog && (
        <SetupWalletDialog
          open={openSetupWalletDialog}
          close={() => setOpenSetupWalletDialog(false)}
        />
      )}
    </>
  );
};

export default AffPayoutsTab;
