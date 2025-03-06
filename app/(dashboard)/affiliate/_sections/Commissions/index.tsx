'use client';

import { useState, type FC } from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import AffCommissionsTabTable from './Table';
import { formatCurrency } from '@/utils/toNumber';
import { useTranslate } from '@/locales';
import TwoFAAlertDialog from '../TwoFAAlertDialog';
import { getUserPlanType } from '@/consts';
import { useGetFinancialInfo } from '@/services/minecraft/financial/financial';
import { useGetMe } from '@/services/minecraft/auth/auth';
import { toast } from 'sonner';
import ContentStack from '@app-components/ContentStack';
import Icon from '@/components/icon';
import WithdrawDialog from '@/components/WithdrawDialog';
import EnableModal from '@app-components/2FA/EnableModal';

const AffCommissionsTab: FC = () => {
  const { t } = useTranslate();
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const [openEnable2FA, setOpenEnable2FA] = useState(false);
  const [open2faAlert, setOpen2faAlert] = useState(false);
  const { data } = useGetFinancialInfo();
  const { data: userInfo } = useGetMe();
  const isFreePlan = getUserPlanType(userInfo?.data) === 'plankton';

  const handleWithdrawClick = () => {
    if (userInfo?.data?.suspended) {
      toast.error(t('global.suspended'));
    } else if (!userInfo?.data?.has_2fa) {
      setOpen2faAlert(true);
    } else {
      setOpenWithdrawDialog(true);
    }
  };

  return (
    <>
      <Stack px={{ md: 4, xs: 3 }} pt={3} flex={1} gap={3}>
        <ContentStack
          direction={{ md: 'row' }}
          height={{ md: '97.84px', xs: '325.53px' }}
          gap={3}
          alignItems={'center'}
          className={!data?.data ? 'loading-skeleton' : ''}
        >
          {data?.data && (
            <>
              <Stack direction={{ md: 'row' }} gap={{ md: 3, xs: 2 }}>
                <Stack gap={0.5}>
                  <Typography variant="p2-medium">
                    {formatCurrency(data?.data?.total_turnover)}
                  </Typography>
                  <Typography variant="caption-medium" color={'grey.light'}>
                    {t('affCommissionsTab.totalTurnover')}
                  </Typography>
                </Stack>
                <Divider flexItem orientation="horizontal" sx={{ borderWidth: '1.5px' }} />
                <Stack gap={0.5}>
                  <Typography variant="p2-medium">
                    {formatCurrency(data?.data?.total_commissions)}
                  </Typography>
                  <Typography variant="caption-medium" color={'grey.light'}>
                    {t('affCommissionsTab.totalCommission')}
                  </Typography>
                </Stack>
                <Divider flexItem orientation="horizontal" sx={{ borderWidth: '1.5px' }} />
                <Stack gap={0.5}>
                  <Typography variant="p2-medium">
                    {formatCurrency(data?.data?.available_for_withdraw)}
                  </Typography>
                  <Typography variant="caption-medium" color={'grey.light'}>
                    {t('affCommissionsTab.availableForWithdraw')}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                sx={{
                  ml: 'auto',
                  width: { md: 'auto', xs: '100%' },
                }}
                color="secondary"
                onClick={handleWithdrawClick}
                startIcon={!!userInfo?.data?.suspended && <Icon name="WarningIcon" />}
                disabled={isFreePlan}
              >
                {t('affCommissionsTab.withdraw')}
              </Button>
            </>
          )}
        </ContentStack>
      </Stack>

      <AffCommissionsTabTable />

      {openWithdrawDialog && (
        <WithdrawDialog open={openWithdrawDialog} close={() => setOpenWithdrawDialog(false)} />
      )}
      {open2faAlert && (
        <TwoFAAlertDialog
          open={open2faAlert}
          close={() => setOpen2faAlert(false)}
          onSubmit={() => {
            setOpen2faAlert(false);
            setOpenEnable2FA(true);
          }}
        />
      )}

      {openEnable2FA && <EnableModal open={openEnable2FA} close={() => setOpenEnable2FA(false)} />}
    </>
  );
};

export default AffCommissionsTab;
